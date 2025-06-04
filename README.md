# 🎓 Learning Management System (LMS)

A full-stack role-based Learning Management System (LMS) built using the **MERN stack**. This platform supports Admin, Instructor, Student, and Examiner roles with features like course creation, video playback, exams, user dashboards, and secure payment using **Stripe**.

---

## 🚀 Tech Stack

**Frontend**: React.js, Tailwind CSS, Redux Toolkit  
**Backend**: Node.js, Express.js, MongoDB, JWT  
**Payments**: Stripe Payment Gateway  
**Auth**: JWT-based Authentication and Role-Based Access Control (RBAC)

---

## 🔐 User Roles

- **Admin**: Full control over platform, users, and courses.  
- **Instructor**: Create/manage courses, upload materials, monitor students.  
- **Student**: Enroll in courses, access content, take exams, download certificates.  
- **Examiner**: Conduct exams, evaluate submissions.

---

## ✨ Features

- ✅ JWT-based authentication and protected routes  
- ✅ Role-based dashboards for Admin, Instructor, Student, Examiner  
- ✅ Course creation with video, files, and PDF material upload  
- ✅ Online exam module with scoring  
- ✅ Student progress tracking  
- ✅ Stripe payment integration for course enrollment  
- ✅ Fully responsive UI using Tailwind CSS

---

## 💳 Stripe Integration

Stripe is used to handle secure and seamless payments for course enrollments.

### 🔧 Flow:

1. Student clicks **"Enroll Now"**
2. Frontend calls backend `/api/payment/create-checkout-session`
3. Backend uses Stripe SDK to create session and redirects user
4. On successful payment, user is enrolled and redirected to course dashboard

> Use test cards provided by Stripe while developing:  
`4242 4242 4242 4242` with any valid date and CVC.

---

## ⚙️ Installation

### Backend Setup

```bash
git clone https://github.com/yourusername/lms-backend
cd lms-backend
npm install
npm start
```

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key

git clone https://github.com/Amankumar-007/Mern-lms
cd Mern-lms
npm install
npm start

REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_STRIPE_KEY=your_stripe_public_key

lms/
├── client/             # React frontend
├── server/             # Node.js backend
├── models/             # MongoDB models
├── routes/             # API routes
├── controllers/        # Business logic
├── middlewares/        # Auth & error handlers
├── utils/              # Payment configs, tokens


---

Would you like me to generate this as a `.md` file for download?
