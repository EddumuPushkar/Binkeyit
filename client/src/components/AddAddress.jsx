import React from 'react';
import api from '../api/axios.js';

function AddAddress({ onClose }) {
	const [formData, setFormData] = React.useState({
		full_name: "",
		address: "",
		city: "",
		state: "",
		pincode: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/address/add-address", formData);
			onClose();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-3">
			
			{/* Modal Box */}
			<div className="bg-white w-full max-w-md sm:max-w-lg p-4 sm:p-6 rounded-xl shadow-lg relative">
				
				<h1 className="font-bold text-lg sm:text-xl mb-4">
					Add Address
				</h1>

				<form onSubmit={handleSubmit} className="space-y-3">
					
					<input
						type="text"
						placeholder="Name"
						onChange={handleChange}
						name="full_name"
						className="border p-2 w-full rounded text-sm sm:text-base"
					/>

					<input
						type="text"
						placeholder="Address"
						onChange={handleChange}
						name="address"
						className="border p-2 w-full rounded text-sm sm:text-base"
					/>

					<input
						type="text"
						placeholder="City"
						onChange={handleChange}
						name="city"
						className="border p-2 w-full rounded text-sm sm:text-base"
					/>

					<input
						type="text"
						placeholder="State"
						onChange={handleChange}
						name="state"
						className="border p-2 w-full rounded text-sm sm:text-base"
					/>

					<input
						type="text"
						placeholder="Pin Code"
						onChange={handleChange}
						name="pincode"
						className="border p-2 w-full rounded text-sm sm:text-base"
					/>

					<button
						type="submit"
						className="bg-green-600 text-white px-5 py-2 rounded-xl w-full text-sm sm:text-base"
					>
						Save Address
					</button>
				</form>

				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-2 right-3 text-red-600 text-xl"
				>
					✕
				</button>

			</div>
		</div>
	);
}

export default AddAddress;