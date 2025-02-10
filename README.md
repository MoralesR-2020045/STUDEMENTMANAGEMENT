# STUDEMENTMANAGEMENT

# API del Sistema de Adopción

El proyecto consiste en una aplicación de ambiente web (solamente Backend) la cual servirá para poder llevar
la administración del control de alumnos de un centro educativo.

## Endpoints de la API

### Autenticación

- **Registrar Usuario Student**
  - **URL:** `/studentManagement/v1/auth/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
        "name": "string ",
        "surname": "string",
        "phone": "string",
        "email": "string",
        "password": "string"
    }
    ```
- **Registrar Usuario Teacher**
  - **URL:** `/studentManagement/v1/auth/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
        "name": "Braulio ",
        "surname": "Echeberria",
        "phone": "90511263",
        "role": "TEACHER_ROLE",
        "email": "becheberria2132@gmail.com",
        "password": "15Braulio#"
    }
    ```

- **Iniciar Sesión**
  - **URL:** `/studentManagement/v1/auth/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

### Funciones del alumno:

- **EL alumno se asigna a maximo 3 cursos, no podiendo asignarse a un curso antes asignado**
  - **URL:** `/studentManagement/v1/user/assignCourseStudent/`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
        "studentId": "uidTeacher",
        "courseId": "uidCourse"
    }
    ```

- **Visualizar los cursos antes asignados**
  - **URL:** `/studentManagement/v1/user/listCourseStudent/:uidStudent`
  - **Método:** `GET`

- **Actualizar su perfil**
  - **URL:** `/studentManagement/v1/user/updateStudent/uidStudent`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
        "name": "string",
        "surname": "string",
        "phone": "string",
        "email": "string"
    }   

    ```

- **Eliminar su usuario y desvinculandose de los cursos**
  - **URL:** `/studentManagement/v1/user/deleteStudent/uidStudent`
  - **Método:** `GET`
  


### Funciones del maestro:

En cada campo debe de ingresarse el ID de un profesor ya que se busca restringe el acceso a la cuenta de un alumno. 

- **Crear Cursos**
- Solamente el profesor puede crear cursos
  - **URL:** `/studentManagement/v1/course/createCourse`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
        "teacherId": "string",
        "nameCourse": "string",
        "descripcion": "string",
    }
    ```

- **Visualizar Cursos**
- Visualizar los cursos que le pertenecen al teacher por medio de su ID
  - **URL:** `/studentManagement/v1/course/listCourseTeacher/:uidTeacher`
  - **Método:** `GET`

- **Actualizar Cursos**
- Actualizar atributos nativos de cursos 
  - **URL:** `/studentManagement/v1/course/updateCourse/:uidCourse`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
        "teacherId": "string",
        "nameCourse": "string",
        "descripcion": "string"
    }  

    ```

- **Eliminar Cursos**
- Al eliminar cursos se desvincula a profesores y estudiantes
  - **URL:** `/studentManagement/v1/user/deleteStudent/uidStudent`
  - **Método:** `GET`
  
