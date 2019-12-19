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
  """
  @api API调用，url设置需要抓取的Rest API地址，参数可以使用{{var}}引用
  """
  directive @api(url: String) on FIELD_DEFINITION

  # https://graphql.github.io/graphql-spec/June2018/#sec-Scalars
  scalar Date

  # https://graphql.github.io/graphql-spec/June2018/#SchemaDefinition
  schema {
    # https://graphql.github.io/graphql-spec/June2018/#RootOperationTypeDefinition
    query: Query
  }

  type Query {
    "查询医生列表"
    findDoctors("科室ID" deptId: Int, "医院ID" hospitalId: Int): [Doctor]
    "查询指定患者"
    findPatient("患者ID" patientId: Int!): Patient
    "医院列表"
    findHospitals: [Hospital]
    "查询指定医院的科室列表"
    findDepartments("医院ID" hospitalId: Int!): [Department]
    "查询员工信息"
    getStaff("手机号码" mobile: String): Staff
  }
  """
  Doctor模型
  """
  type Doctor {
    "医生ID"
    doctorId: Int @dto
    "医生姓名"
    doctorName: String @dto
    "医生性别"
    gender: Gender #@dto
    specializedIn: String @dto
    signature: String @dto
    introduction: String @dto
    hospital: Hospital # @api(url: "/api/hospital/{{hospital_id}}")
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
    gender: Gender #@dto
    doctors: [Doctor]
  }

  type Staff {
    staffId: Int @fetch(from: "id")
    staffName: String @dto
    mobile: String @dto
    role: String @dto
    created_at: Date
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