-- =============================
-- 创建表结构
-- =============================
-- DROP INDEX "idx_mobile";

-- DROP TABLE "doctor";
-- DROP TABLE "department";
-- DROP TABLE "hospital";
-- DROP TABLE "staff";
-- DROP TABLE "doctor_patient_mapping";
-- DROP TABLE "patient";

CREATE TABLE "doctor"
(
    "doctor_id" INTEGER NOT NULL,
    "hospital_id" INTEGER,
    "dept_id" INTEGER,
    "doctor_name" TEXT,
    "gender" INTEGER DEFAULT 0,
    "specialized_in" TEXT,
    "signature" TEXT,
    "introduction" TEXT,
    PRIMARY KEY ("doctor_id")
    -- ,
    -- CONSTRAINT "fk_doctor_department_1" FOREIGN KEY ("dept_id") REFERENCES "department" ("dept_id"),
    -- CONSTRAINT "fk_doctor_hospital_1" FOREIGN KEY ("hospital_id") REFERENCES "hospital" ("id")
);
CREATE TABLE "department"
(
    "dept_id" INTEGER NOT NULL,
    "hospital_id" INTEGER,
    "dept_name" TEXT,
    "introduction" TEXT,
    PRIMARY KEY ("dept_id")
    -- ,
    -- CONSTRAINT "fk_department_hospital_1" FOREIGN KEY ("hospital_id") REFERENCES "hospital" ("id")
);
CREATE TABLE "hospital"
(
    "id" INTEGER NOT NULL,
    "hospital_name" TEXT,
    "level" TEXT,
    "address" TEXT,
    PRIMARY KEY ("id")
);
CREATE TABLE "staff"
(
    "id" INTEGER NOT NULL,
    "staff_name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "role" TEXT DEFAULT STAFF,
    PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "idx_mobile" ON "staff" ("mobile" ASC);

CREATE TABLE "doctor_patient_mapping"
(
    "doctor_id" INTEGER NOT NULL,
    "patient_id" INTEGER NOT NULL,
    PRIMARY KEY ("doctor_id", "patient_id")
    -- ,
    -- CONSTRAINT "fk_doctor_patient_mapping_doctor_1" FOREIGN KEY ("doctor_id") REFERENCES "doctor" ("doctor_id"),
    -- CONSTRAINT "fk_doctor_patient_mapping_patient_1" FOREIGN KEY ("patient_id") REFERENCES "patient" ("patient_id")
);
CREATE TABLE "patient"
(
    "patient_id" INTEGER NOT NULL,
    "patient_name" TEXT,
    "gender" INTEGER DEFAULT 0,
    PRIMARY KEY ("patient_id")
);

-- =============================
-- 数据导入
-- =============================

INSERT INTO "hospital"
    ("id", "hospital_name", "level", "address")
VALUES
    (1, "上海市第六人民医院", "三甲", "上海市徐汇区宜山路600号"),
    (2, "上海交通大学医学院附属仁济医院北院", "三甲", "上海市浦东新区灵山路845号"),
    (3, "复旦大学附属华山医院", "三甲", "上海市静安区乌鲁木齐中路12号");

INSERT INTO "patient"
    ("patient_id","patient_name","gender")
VALUES
    (1, "嫦娥", 2),
    (2, "盘古", 1),
    (3, "安琪拉", 2),
    (4, "典韦", 1),
    (5, "后羿", 1),
    (6, "武则天", 2),
    (7, "亚瑟", 1),
    (8, "牛魔", 1);

INSERT INTO "department"
    ("dept_id","hospital_id","dept_name","introduction")
VALUES
    (1, 1, "心内科", "治疗的疾病包括心绞痛、高血压、猝死、心律失常、心力衰竭、早搏、心律不齐、心肌梗死、心肌病、心肌炎、急性心肌梗死等心血管疾病。"),
    (2, 2, "心内科", "治疗的疾病包括心绞痛、高血压、猝死、心律失常、心力衰竭、早搏、心律不齐、心肌梗死、心肌病、心肌炎、急性心肌梗死等心血管疾病。"),
    (3, 3, "心内科", "治疗的疾病包括心绞痛、高血压、猝死、心律失常、心力衰竭、早搏、心律不齐、心肌梗死、心肌病、心肌炎、急性心肌梗死等心血管疾病。"),
    (4, 1, "耳鼻喉科", "诊断治疗耳、鼻、咽、喉、及其相关头颈区域的外科学科"),
    (5, 2, "耳鼻喉科", "诊断治疗耳、鼻、咽、喉、及其相关头颈区域的外科学科"),
    (6, 3, "耳鼻喉科", "诊断治疗耳、鼻、咽、喉、及其相关头颈区域的外科学科"),
    (7, 1, "心理咨询室", "聊心理"),
    (8, 3, "心理咨询室", "聊心理"),
    (9, 1, "消化内科", "研究食管、胃、小肠、大肠、肝、胆及胰腺等疾病为主要内容的临床三级学科。");

INSERT INTO "doctor"
    ("doctor_id",
    "hospital_id",
    "dept_id" ,
    "doctor_name" ,
    "gender" ,
    "specialized_in" ,
    "signature" ,
    "introduction" )
VALUES
    (1, 1, 1, "马超", 1, "治疗的疾病包括心绞痛", "没我不会的", "放马过来"),
    (2, 1, 4, "猪八戒", 1, "诊断治疗耳", "猪耳朵去骨", "卤味好吃"),
    (3, 3, 8, "女娲", 2, "补天补牙都可以", "牙好胃口就好", "吃猪耳朵"),
    (4, 1, 9, "张飞", 1, "吃啥消化啥", "牙好胃口就好", "吃猪耳朵"),
    (5, 2, 5, "白起", 1, "砍了就能吃", "砍砍砍", "还是吃猪耳朵");

INSERT INTO "doctor_patient_mapping"
    ("doctor_id", "patient_id")
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 2),
    (5, 3),
    (4, 6),
    (1, 4),
    (2, 8),
    (3, 5),
    (3, 3),
    (4, 7),
    (5, 7),
    (4, 4);

INSERT INTO "staff"
    ("id","staff_name","mobile","role")
VALUES
    (1, "张大辉", "13801800500", "ADMIN"),
    (2, "张小辉", "13801800501", "STAFF");