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
  # https://www.apollographql.com/docs/apollo-server/schema/scalars-enums/
  scalar Date

  # https://graphql.github.io/graphql-spec/June2018/#SchemaDefinition
  schema {
    # https://graphql.github.io/graphql-spec/June2018/#RootOperationTypeDefinition
    query: Query
    mutation: Mutation
  }
  # https://graphql.github.io/graphql-spec/June2018/#sec-Input-Objects
  input StaffParams {
    staffName: String!
    mobile: String!
    role: String
    createdAt: Date
  }
  # https://www.apollographql.com/docs/apollo-server/schema/schema/#designing-mutations
  type Mutation {
    addStaff(staffName: String!, mobile: String!, role: String, createdAt: Date): Staff
    # https://graphql.github.io/learn/schema/#input-types
    # addStaff(input: StaffParams): Staff
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
    "查询人类"
    findHuman: [Human] # [IHuman]
  }

  # https://graphql.github.io/learn/schema/#union-types
  union Human = Doctor | Staff | Patient

  interface IHuman {
    id: Int
    name: String
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
    "擅长领域"
    specializedIn: String @dto
    "个性签名"
    signature: String @dto
    "医生简介"
    introduction: String @dto
    "所属医院"
    hospital: Hospital # @api(url: "/api/hospital/{{hospital_id}}")
    "所属科室"
    department: Department
    "患者列表"
    patients: [Patient]
  }

  # """
  # Doctor模型
  # """
  # type Doctor implements IHuman {
  #   "医生ID"
  #   id: Int @fetch(from: "doctor_id")
  #   "医生姓名"
  #   name: String @fetch(from: "doctor_name")
  #   "医生性别"
  #   gender: Gender #@dto
  #   "擅长领域"
  #   specializedIn: String @dto
  #   "个性签名"
  #   signature: String @dto
  #   "医生简介"
  #   introduction: String @dto
  #   "所属医院"
  #   hospital: Hospital # @api(url: "/api/hospital/{{hospital_id}}")
  #   "所属科室"
  #   department: Department
  #   "患者列表"
  #   patients: [Patient]
  # }

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

  # """
  # Patient模型
  # """
  # type Patient implements IHuman {
  #   id: Int @fetch(from: "patient_id")
  #   name: String @fetch(from: "patient_name")
  #   gender: Gender #@dto
  #   doctors: [Doctor]
  # }

  """
  Staff模型
  """
  type Staff {
    staffId: Int @fetch(from: "id")
    staffName: String @dto
    mobile: String @dto
    role: String @dto
    created_at: Date
  }

  # """
  # Staff模型
  # """
  # type Staff implements IHuman {
  #   id: Int @fetch(from: "id")
  #   name: String @fetch(from: "staff_name")
  #   mobile: String @dto
  #   role: String @dto
  #   created_at: Date
  # }

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
