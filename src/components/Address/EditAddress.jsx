// import { useState } from "react";
// import styles from "./Address.module.css";

// function EditAddress({
//   _id,
//   name,
//   phone,
//   pincode,
//   address,
//   state,
//   city,
//   setIsEdit,
// }) {
//   const [editName, setEditName] = useState("");
//   const [editPhone, setEditPhone] = useState(0);
//   const [editPincode, setEditPincode] = useState(0);
//   const [editAddress, setEditAddress] = useState("");
//   const [editState, setEditState] = useState("");
//   const [editCity, setEditCity] = useState("");
//   return (
//     <div>
//       <div className={styles.input__wrapper}>
//         <label>Name</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setEditName(e.target.value)}
//           className={styles.address__input}
//         />
//       </div>
//       <div className={styles.input__wrapper}>
//         <label>Name</label>
//         <input
//           type="number"
//           value={phone}
//           onChange={(e) => setEditPhone(e.target.value)}
//           className={styles.address__input}
//         />
//       </div>
//       <div className={styles.input__wrapper}>
//         <label>Name</label>
//         <input
//           type="number"
//           value={pincode}
//           onChange={(e) => setEditPincode(e.target.value)}
//           className={styles.address__input}
//         />
//       </div>
//       <div className={styles.input__wrapper}>
//         <label>Name</label>
//         <input
//           type="text"
//           value={address}
//           onChange={(e) => setEditAddress(e.target.value)}
//           className={styles.address__input}
//         />
//       </div>
//       <div className={styles.input__wrapper}>
//         <label>Name</label>
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setEditCity(e.target.value)}
//           className={styles.address__input}
//         />
//       </div>
//       <div className={styles.input__wrapper}>
//         <label>Name</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setEditName(e.target.value)}
//           className={styles.address__input}
//         />
//       </div>
//       <div className={styles.input__wrapper}>
//         <label>State</label>
//         <select
//           name="state"
//           id="state"
//           value={state}
//           className={styles.address__input}
//           onChange={(e) => setEditState(e.target.value)}
//         >
//           <option value="Andhra Pradesh">Andhra Pradesh</option>
//           <option value="Assam">Assam</option>
//           <option value="Goa">Goa</option>
//           <option value="Karnataka">Karnataka</option>
//           <option value="Kerala">Kerala</option>
//           <option value="Maharashtra">Maharashtra</option>
//           <option value="Bihar">Maharashtra</option>
//           <option value="Haryana">Haryana</option>
//           <option value="Manipur">Manipur</option>
//           <option value="Tamil Nadu">Tamil Nadu</option>
//         </select>
//       </div>
//       <div className={styles.address__btn_wrapper}>
//         <button
//           className={styles.btn__address}
//           onClick={() => setIsEdit(false)}
//         >
//           <FiEdit2 className={styles.btn__address__icon} />
//           save address
//         </button>
//         <button
//           className={styles.btn__address}
//           onClick={() => setIsEdit(false)}
//         >
//           <FiEdit2 className={styles.btn__address__icon} />
//           discard
//         </button>
//       </div>
//     </div>
//   );
// }

// export { EditAddress };
