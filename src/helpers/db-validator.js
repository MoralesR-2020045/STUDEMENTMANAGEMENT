import User from "../user/user.model.js"
import Course from "../course/course.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email});
    if(existe){
        throw new Error(`El correo ${email} ya esta registrado`)
    }
}

export const accessCourse = async (teacherId = "") =>{
    const user = await User.findById(teacherId);
    if(!user){
        throw new Error(`El usuario de ID: ${teacherId} no ha sido encontrado`)
    }
    if ( user.role === "TEACHER_ROLE"){
        return {
            message: "Bienvenido Profesor"
        }
    }else{
        throw new Error(`Tu usuario no puede hacer dicha accion tu rol: ${user.role}`)
    }
}

export const nameExistsCourse = async (name = "") => {
    const existName = await Course.findOne({nameCourse: name});
    if(existName){
        throw new Error(`Ya existe un curso con este nombre ${name}`)
    }   
}

// Las siguientes validaciones son para crea un curso
export const courseExist = async (courseId = "" ) =>{
    const existCourse =  await Course.findById(courseId);
    if(!existCourse){
        throw new Error(`El curso de id: ${courseId} no ha sido encontrado`)
    }
}


export const studentExist = async (studenId = "" ) =>{
    const user =  await User.findById(studenId);
    if(!user){
        throw new Error(`El usuario de ID: ${studenId} no ha sido encontrado`)
    }
    if(user.role === "STUDENT_ROLE"){
        return {
            message: "El usuario ha sido validado correctamete "
        }
    }else{
        throw new Error(`No eres un estudiante. Tu rol actual es: ${user.role}`);
    }
}

export const listCourse = async (studenId = "" ) =>{
    const user =  await User.findById(studenId);
    const number = user.course.length;
    if(number == 3){
        throw new Error(`No te puedes asignar a mas de 3 cursos. Has llegado al limite`)
    }
}

