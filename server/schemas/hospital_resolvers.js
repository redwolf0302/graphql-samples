const doctorDao = require("../doctor/dao");
const hospitalDao = require("../hospital/dao");
const departmentDao = require("../department/dao");
const patientDao = require("../patient/dao");
const staffDao = require("../staff/dao");
const fetch = require("node-fetch");
module.exports = {
  Query: {
    // https://www.apollographql.com/docs/apollo-server/data/data/#resolver-type-signature
    findDoctors(parent, args, context, info) {
      const { deptId, hospitalId } = args;
      if (deptId) {
        return doctorDao.doctorsByDeptId(deptId);
      } else if (hospitalId) {
        return doctorDao.doctorsByHospitalId(hospitalId);
      }
      return doctorDao.doctors();
    },
    // async findDoctors(parent, args, context, info) {},
    findHospitals(parent, args, context, info) {
      return hospitalDao.hospitals();
    },
    findDepartments(parent, args, context, info) {
      const { hospitalId } = args;
      return departmentDao.departmentsByHospitalId(hospitalId);
    },
    findPatient(parent, args, context, info) {
      const { patientId } = args;
      return patientDao.patientById(patientId);
    },
    getStaff(parent, args, context, info) {
      const { mobile } = args;
      return staffDao.staffByMobile(mobile);
    },
  },
  Doctor: {
    hospital(doctor) {
      return hospitalDao.hospitalById(doctor.hospital_id);
    },
    department(doctor) {
      return departmentDao.departmentById(doctor.dept_id);
    },
    // async department(doctor) {
    //   return fetch(`http://localhost:8080/api/department/${doctor.dept_id}`, { method: "GET" }).then(response =>
    //     response.json()
    //   );
    // },
    patients(doctor) {
      return patientDao.patientsByDoctorId(doctor.doctor_id);
    },
  },
  Hospital: {
    doctors(hospital) {
      return doctorDao.doctorsByHospitalId(hospital.id);
    },
    departments(hospital) {
      return departmentDao.departmentsByHospitalId(hospital.id);
    },
  },
  Department: {
    doctors(department) {
      return doctorDao.doctorsByDeptId(department.dept_id);
    },
  },
  Patient: {
    doctors(patient) {
      return patientDao.doctorsByPatientId(patient.patient_id);
    },
  },
};