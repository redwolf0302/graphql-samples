const { gql } = require("apollo-server-express");
// =======================
// 定义Hospital Schema
// =======================
module.exports = gql`
  # https://graphql.github.io/graphql-spec/June2018/#sec-Type-System.Directives
  """
  @fetch 字段抓取指令
  """
  directive @fetch(from: String!) on FIELD_DEFINITION
  """
  @dto 格式化数据库字段名称 doctorName 改为 doctor_name
  """
  directive @dto on OBJECT | FIELD_DEFINITION
  # https://graphql.github.io/graphql-spec/June2018/#SchemaDefinition
  schema {
    # https://graphql.github.io/graphql-spec/June2018/#RootOperationTypeDefinition
    query: Query
  }

  type Query {
    "查询医生列表"
    findDoctors(deptId: Int, hospitalId: Int): [Doctor]
    "查询指定患者"
    findPatient(patientId: Int!): Patient
    "医院列表"
    findHospitals: [Hospital]
    "查询指定医院的科室列表"
    findDepartments(hospitalId: Int!): [Department]
  }
  """
  Doctor模型
  """
  type Doctor {
    doctorId: Int @dto
    "医生姓名"
    doctorName: String @dto
    gender: Int @dto
    specializedIn: String @dto
    signature: String @dto
    introduction: String @dto
    hospital: Hospital
    department: Department
    patients: [Patient]
  }

  """
  Hospital模型
  """
  type Hospital {
    hospitalId: Int @fetch(from: "id")
    hospitalName: String @dto
    level: String @dto
    address: String @dto
    doctors: [Doctor]
    departments: [Department]
  }

  """
  Department模型
  """
  type Department {
    deptId: Int @dto
    deptName: String @dto
    introduction: String @dto
    doctors: [Doctor]
  }

  """
  Patient模型
  """
  type Patient {
    patientId: Int @dto
    patientName: String @dto
    gender: Int @dto
    doctors: [Doctor]
  }
  """
  Gender枚举
  """
  enum Gender {
    "未知性别"
    UNKNOWN

    "男性"
    MALE

    "女性"
    FEMALE
  }
`;
