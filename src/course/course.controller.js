'use strict'
import Course from "./course.model.js"
import User from "../user/user.model.js"

// Creacion del curso
export const createCourse = async (req, res) =>{
    try{
        const informationCourse = req.body;
        const course = await Course.create(informationCourse);
        const document  = await Course.findById(course.id).populate("teacherId");
        /*lo siguiente es para referenciar que teacherId es una lista de forma obvia estamos
         creando el curso inicialmente solo un teacher tendremos entonces devolvemos la posicion 0 de la lista */
        const teacherData = document.teacherId[0]; 
        
        const uid = teacherData.id;
        const courseUsuario = document.id;
        /*Lo siguiente  evalua que un profesor pueda tener varios cursos a cargo
        volviendola una lista de objectsId  y luego con each permitiendo la entrada de varios id*/ 
        await User.findByIdAndUpdate(uid,{
            $push: {
                course:{$each: [courseUsuario]}
            }
        }, 
        {new: true});

        return res.status(201).json({
            message: "you have successfully created the course",
            idCoursw: document.id,
            nameCourse: document.nameCourse,
            descripcion: document.descripcion,
            teacher: {
                nameTeacher: teacherData.name,
                email: teacherData.email,
                role: teacherData.role
            }
        });
    }catch(err){
        return res.status(500).json({
            message: "Error creating course",
            error: err.message
        });
    }
}

// Actualizar datos del Curso
export const updateCourse = async (req, res) => {
    try {
        const { uid } = req.params;
        const  {nameCourse, descripcion }  = req.body;
        console.log(uid)
        const course = await Course.findByIdAndUpdate(uid, {nameCourse, descripcion}, { new: true });

        res.status(200).json({
            msg: 'Curso Actualizado',
            course,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar curso',
            error: err.message
        });
    }
}

// Visualizar los cursos que posea el profesor 
export const  listCourseTeacher = async (req, res) =>{
    try{
        const  { uid } = req.params
        /*La variable userObcjet recibira todos los atributos menos los que referecia path 
        los que estan dentro de select seran excluidos por eso el -*/
        const userObject = await User.findById(uid).populate({
            path: "course",
            select: "-teacherId -__v -status"  
        });

        const use = userObject.status;
        if(use === true){
            return res.status(201).json({
                name: userObject.name,
                email: userObject.email,
                role: userObject.role,
                message: "Pertenece a los siguientes cursos",
                course: userObject.course 
        })
        }
        return res.status(201).json({
            message: "El curso fue eliminado"
        });
    }catch(err){
        return res.status(500).json({
            message: "Error when listing courses",
            error: err.message 
        });
    }
}



// Eliminar curso
export const deleteCourse = async (req, res) => {
    try{
        const { uid } = req.params
        await Course.findByIdAndUpdate(uid, {status: false}, {new: true})
        await User.updateMany(
            { course: uid }, // Filtra a los usuarios que tienen el curso en su lista
            { $pull: { course: uid } } // Remueve el id del curso de la lista
        );
        return res.status(200).json({
            success: true,
            message: "Curso eliminado",
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}