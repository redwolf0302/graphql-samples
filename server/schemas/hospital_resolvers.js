const doctorDao = require("../doctor/dao");
const hospitalDao = require("../hospital/dao");
const departmentDao = require("../department/dao");
const patientDao = require("../patient/dao");
const staffDao = require("../staff/dao");
const fetch = require("node-fetch");
const moment = require("moment");
module.exports = {
  Mutation: {
    addStaff(parent, args, context, info) {
      const { staffName, mobile, role, createdAt } = args;
      const staffId = staffDao.insertStaff({ staff_name: staffName, mobile, role, created_at: createdAt });
      return staffDao.staffById(staffId);
    },
    // addStaff(parent, args, context, info) {
    //   const {
    //     input: { staffName, mobile, role, createdAt },
    //   } = args;
    //   const staffId = staffDao.insertStaff({ staff_name: staffName, mobile, role, created_at: createdAt });
    //   return staffDao.staffById(staffId);
    // },
  },
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
    findHuman(parent, args, context, info) {
      let doctors = doctorDao.doctors();
      let patients = patientDao.patients();
      let staffs = staffDao.staffs();
      let human = []
        .concat(doctors)
        .concat(patients)
        .concat(staffs);
      return human;
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
  Human: {
    // https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/
    __resolveType(obj, context, info) {
      if ("doctor_name" in obj) {
        return "Doctor";
      }

      if ("staff_name" in obj) {
        return "Staff";
      }

      if ("patient_name" in obj) {
        return "Patient";
      }

      return null;
    },
  },
  IHuman: {
    // https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/
    __resolveType(obj, context, info) {
      if ("doctor_name" in obj) {
        return "Doctor";
      }

      if ("staff_name" in obj) {
        return "Staff";
      }

      if ("patient_name" in obj) {
        return "Patient";
      }

      return null;
    },
  },
};
