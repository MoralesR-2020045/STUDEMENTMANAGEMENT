import Course from "../course/course.model.js";
import User from "./user.model.js";

//Asignacion del estudiante a un curso 
export const assignCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        const studentObject = await User.findById(studentId);
        const courseObject = await Course.findById(courseId);
        /*El uso de $in el cual evalua si dentro de la lista de couse ha un dato
        repetido devolviendo un true luego evaluado por el if*/
        const verifyCourse = await User.findOne({ 
            _id: studentId, course: { $in: [courseId] }
        });
        if (verifyCourse){
            return res.status(400).json({
                message: "Ya está asignado a este curso"
            })
        }
        /*Lo siguiente  evalua que un usuario pueda asignarse acursos
        volviendola una lista de objectsId por push  y luego con addToSet asegura 
        que no se este enviando courseId duplicado */ 
        await User.findByIdAndUpdate(studentId,{
            $push: {
                course:{$each: [courseObject.id]}
            }
        }, 
        {new: true});
        /*Añadir a la lista de estudiantes del curso */
        await Course.findByIdAndUpdate(courseId,{
            $push:{
                listStudentId:{$each: [studentObject.id]}
            }
        },{new: true });
        /*Vuelvo  a caragar el documente para actualizar el agregado a la lista de curso*/
        const userObject = await User.findById(studentId).populate("course");
        return res.status(201).json({
            message: "Se asignado correctamente",
            name: userObject.name,
            role: userObject.role,
            course: userObject.course 
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error al assign to a course", 
            error: err.message
        });
    }
}

//Visualizacion de cursos del estudiante 
export const  listCourseAssign = async (req, res) =>{
    try{
        const  { uid } = req.params
        /*La variable userObcjet recibira todos los atributos menos los que referecia path 
        los que estan dentro de select seran excluidos por eso el -*/
        const userObject = await User.findById(uid).populate({
            path: "course",
            select: "-listStudentId -__v -status"  
        });
        const use = userObject.status;
        if(use === true){
            return res.status(201).json({
                name: userObject.name,
                email: userObject.email,
                role: userObject.role,
                course: userObject.course 
            });
        }
        return res.status(201).json({
            message: "El estudiante fue eliminado"
        });
    }catch(err){
        return res.status(500).json({
            message: "Error when listing courses",
            error: err.message 
        });
    }
}

// Actualizar datos del Alumno
export const updateStudent = async (req, res) => {
    try {
        const {uid} = req.params;
        const  data = req.body;
        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            msg: 'Alumno Actualizado',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar Alumno',
            error: err.message
        });
    }
}


//Eliminar Estudiante

export const deleteStudent = async (req, res) => {
    try{
        const { uid } = req.params
        await User.findByIdAndUpdate(uid, {status: false}, {new: true})
        await Course.updateMany(
            { listStudentId: uid }, // Filtra a los usuarios que tienen el curso en su lista
            { $pull: { listStudentId: uid } } // Remueve el id del curso de la lista
        );
        return res.status(200).json({
            success: true,
            message: "Estudiante eliminado",
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}