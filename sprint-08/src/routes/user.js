const path = require("path");
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const multer = require("multer");
const { body } = require("express-validator");
const guestMiddleware = require("../../middlewares/guestMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware");

var multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/users");
  },
  filename: (req, file, cb) => {
    cb(null, "avatar-" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: multerStorage });
//ejecuto multer

router.get("/profile/", authMiddleware, userController.profile);
router.put("/upload", upload.single("image"), userController.upload);
router.get("/register", guestMiddleware, userController.register);
router.get("/userDetail", guestMiddleware, userController.detailView);
router.post(
  "/register",
  upload.single("image"),
  [
    body("full_name")
      .isLength({ min: 4 })
      .withMessage("Debe ingresar un Nombre completo"),
    body("email")
        .isEmail()
        .withMessage("Debe ingresar un email valido"),
    body("password")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      })
      .withMessage(
        "La clave debe tener mas de 3 caracteres, una mayúscula y una minúscula"
      ),
    body("password_confirm").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),
    body("acepta_condiciones")
      .notEmpty()
      .withMessage("Debe aceptar nuestros terminos y condiciones"),
  ],
  userController.processRegister
);

router.get("/logout", userController.logout);

module.exports = router;
