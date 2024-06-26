import mongoose from "mongoose";

const Admin = mongoose.Schema(
  {
    adminID: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fatherName: { type: String, required: true },
    mobile_no: { type: Number, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other", "prefer not to say"],
    },
    dob: { type: String, required: true },
    religion: { type: String, required: true },
    martial_status: { type: String, required: true },
    national_id: {
      type: String,
      required: true,
      enum: [
        "Adhar Card",
        "Pan Card",
        "Driving License",
        "Voter ID",
        "Indian Passport",
      ],
      message: "Please provide a National ID",
    },
    national_id_number: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          if (this.national_id === "Adhar Card") {
            return value.toString().length === 12 ? true : false;
          } else if (this.national_id === "Pan Card") {
            return value.toString().length === 10 ? true : false;
          } else if (this.national_id === "Driving License") {
            return value.toString().length >= 10 &&
              value.toString().length <= 20
              ? true
              : false;
          } else if (this.national_id === "Voter ID") {
            return value.toString().length === 10 ? true : false;
          } else if (this.national_id === "Indian Passport") {
            return value.toString().length === 8 ? true : false;
          } else {
            return true;
          }
        },
        message: function () {
          return `Please provide valid National ID Number for specific ID (check Length of provided Input)`;
        },
      },
    },
    joining_date: {
      type: String,
      required: true,
    },
    current_address: {
      category: { type: String, required: true },
      admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        default: null,
      },
      house_no: { type: Number, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postal_code: {
        type: Number,
        required: true,
        minLength: 6,
        message: "Postal code must have 6 Digits",
      },
    },
    qualifications: [
      {
        admin_id: { type: mongoose.Schema.Types.ObjectId },
        insitute_name: { type: String },
        qlfc_name: { type: String },
        completion_year: { type: Number },
      },
    ],
    documents: {
      pic: { type: String, required: true },
      signature_img: { type: String, required: true },
      resume_or_cv: { type: String, required: true },
      bankDetails: { type: String, required: true },
    },
    achievements: [
      {
        name: { type: String },
        achmtsDesc: { type: String },
        digitalLink: { type: String },
      },
    ],
    password: { type: String, required: true },
  },
  { timestamp: true }
);

const AdminSchema = mongoose.model("Admin", Admin);
export default AdminSchema;
