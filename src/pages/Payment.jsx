import { useState } from "react";
import { useNavigate, Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useStore from "../store/useStore";

const Payment = () => {
	const { cart, clearCart } = useStore();
	const navigate = useNavigate();

	const [paymentMethod, setPaymentMethod] = useState("creditCard");
	const [paymentInfo, setPaymentInfo] = useState({
		cardName: "",
		cardNumber: "",
		expiryMonth: "",
		expiryYear: "",
		cvv: "",
	});
	const [isProcessing, setIsProcessing] = useState(false);
	const [errors, setErrors] = useState({});

	// Calculate totals (should ideally come from a context/store)
	const subtotal = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);
	const shipping = subtotal > 5000 ? 0 : 300; // Free shipping for orders over ₹5000
	const tax = subtotal * 0.18; // 18% GST
	const total = subtotal + shipping + tax;

	// List of years for expiry date
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

	const handlePaymentChange = (e) => {
		const { name, value } = e.target;
		setPaymentInfo((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error for this field if exists
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: null,
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		// Card name validation
		if (!paymentInfo.cardName.trim()) {
			newErrors.cardName = "Name on card is required";
		}

		// Card number validation (simple 16 digit check)
		const cardNumberRegex = /^[0-9]{16}$/;
		if (!cardNumberRegex.test(paymentInfo.cardNumber.replace(/\s/g, ""))) {
			newErrors.cardNumber = "Please enter a valid 16-digit card number";
		}

		// Expiry date validation
		if (!paymentInfo.expiryMonth) {
			newErrors.expiryMonth = "Month is required";
		}

		if (!paymentInfo.expiryYear) {
			newErrors.expiryYear = "Year is required";
		}

		// CVV validation (3 or 4 digits)
		const cvvRegex = /^[0-9]{3,4}$/;
		if (!cvvRegex.test(paymentInfo.cvv)) {
			newErrors.cvv = "Please enter a valid 3 or 4 digit CVV";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const formatCardNumber = (value) => {
		const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		const matches = v.match(/\d{4,16}/g);
		const match = (matches && matches[0]) || "";
		const parts = [];

		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}

		if (parts.length) {
			return parts.join(" ");
		} else {
			return value;
		}
	};

	const handleCardNumberChange = (e) => {
		const formattedValue = formatCardNumber(e.target.value);
		setPaymentInfo((prev) => ({
			...prev,
			cardNumber: formattedValue,
		}));

		if (errors.cardNumber) {
			setErrors((prev) => ({
				...prev,
				cardNumber: null,
			}));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsProcessing(true);

		// Simulate payment processing
		setTimeout(() => {
			setIsProcessing(false);

			// Order success - clear cart and redirect to confirmation
			clearCart();
			navigate("/order-confirmation", {
				state: {
					orderNumber: `BT-${Math.floor(100000 + Math.random() * 900000)}`,
					orderDate: new Date().toISOString(),
					total,
				},
			});
		}, 2000);
	};

	// If cart is empty, redirect to cart page
	if (cart.length === 0) {
		return (
			<div className="min-h-screen flex flex-col">
				<Navbar />
				<div className="container mx-auto px-4 py-16 flex-grow text-center">
					<h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
					<p className="text-gray-600 mb-8">
						You need to add items to your cart before proceeding to payment.
					</p>
					<Link
						to="/"
						className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
					>
						Continue Shopping
					</Link>
				</div>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<div className="container mx-auto px-4 py-8 flex-grow">
				<div className="max-w-6xl mx-auto">
					<h1 className="text-3xl font-bold mb-8">Payment</h1>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Payment Form */}
						<div className="lg:col-span-2">
							<form onSubmit={handleSubmit}>
								{/* Payment Method Selection */}
								<div className="bg-white rounded-lg shadow-md p-6 mb-8">
									<h2 className="text-xl font-semibold mb-4">Payment Method</h2>

									<div className="space-y-4">
										<label className="flex items-center">
											<input
												type="radio"
												name="paymentMethod"
												value="creditCard"
												checked={paymentMethod === "creditCard"}
												onChange={() => setPaymentMethod("creditCard")}
												className="h-5 w-5 text-blue-600"
											/>
											<span className="ml-2 font-medium">
												Credit Card / Debit Card
											</span>
										</label>

										<label className="flex items-center opacity-50 cursor-not-allowed">
											<input
												type="radio"
												name="paymentMethod"
												value="paypal"
												disabled
												className="h-5 w-5 text-blue-600"
											/>
											<span className="ml-2 font-medium">
												PayPal (Coming Soon)
											</span>
										</label>

										<label className="flex items-center opacity-50 cursor-not-allowed">
											<input
												type="radio"
												name="paymentMethod"
												value="applePay"
												disabled
												className="h-5 w-5 text-blue-600"
											/>
											<span className="ml-2 font-medium">
												Apple Pay (Coming Soon)
											</span>
										</label>
									</div>
								</div>

								{/* Credit Card Form */}
								{paymentMethod === "creditCard" && (
									<div className="bg-white rounded-lg shadow-md p-6 mb-8">
										<h2 className="text-xl font-semibold mb-4">
											Credit Card Information
										</h2>

										<div className="mb-4">
											<label
												htmlFor="cardName"
												className="block text-gray-700 mb-2"
											>
												Name on Card*
											</label>
											<input
												type="text"
												id="cardName"
												name="cardName"
												value={paymentInfo.cardName}
												onChange={handlePaymentChange}
												className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardName ? "border-red-500" : "border-gray-300"}`}
											/>
											{errors.cardName && (
												<p className="text-red-500 text-sm mt-1">
													{errors.cardName}
												</p>
											)}
										</div>

										<div className="mb-4">
											<label
												htmlFor="cardNumber"
												className="block text-gray-700 mb-2"
											>
												Card Number*
											</label>
											<input
												type="text"
												id="cardNumber"
												name="cardNumber"
												value={paymentInfo.cardNumber}
												onChange={handleCardNumberChange}
												placeholder="XXXX XXXX XXXX XXXX"
												maxLength="19"
												className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardNumber ? "border-red-500" : "border-gray-300"}`}
											/>
											{errors.cardNumber && (
												<p className="text-red-500 text-sm mt-1">
													{errors.cardNumber}
												</p>
											)}
										</div>

										<div className="grid grid-cols-3 gap-4 mb-4">
											<div>
												<label
													htmlFor="expiryMonth"
													className="block text-gray-700 mb-2"
												>
													Expiry Month*
												</label>
												<select
													id="expiryMonth"
													name="expiryMonth"
													value={paymentInfo.expiryMonth}
													onChange={handlePaymentChange}
													className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.expiryMonth ? "border-red-500" : "border-gray-300"}`}
												>
													<option value="">Month</option>
													{Array.from({ length: 12 }, (_, i) => i + 1).map(
														(month) => (
															<option
																key={month}
																value={month.toString().padStart(2, "0")}
															>
																{month.toString().padStart(2, "0")}
															</option>
														),
													)}
												</select>
												{errors.expiryMonth && (
													<p className="text-red-500 text-sm mt-1">
														{errors.expiryMonth}
													</p>
												)}
											</div>

											<div>
												<label
													htmlFor="expiryYear"
													className="block text-gray-700 mb-2"
												>
													Expiry Year*
												</label>
												<select
													id="expiryYear"
													name="expiryYear"
													value={paymentInfo.expiryYear}
													onChange={handlePaymentChange}
													className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.expiryYear ? "border-red-500" : "border-gray-300"}`}
												>
													<option value="">Year</option>
													{years.map((year) => (
														<option key={year} value={year}>
															{year}
														</option>
													))}
												</select>
												{errors.expiryYear && (
													<p className="text-red-500 text-sm mt-1">
														{errors.expiryYear}
													</p>
												)}
											</div>

											<div>
												<label
													htmlFor="cvv"
													className="block text-gray-700 mb-2"
												>
													CVV*
												</label>
												<input
													type="password"
													id="cvv"
													name="cvv"
													value={paymentInfo.cvv}
													onChange={handlePaymentChange}
													maxLength="3"
													className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cvv ? "border-red-500" : "border-gray-300"}`}
												/>
												{errors.cvv && (
													<p className="text-red-500 text-sm mt-1">
														{errors.cvv}
													</p>
												)}
											</div>
										</div>

										<div className="mt-6">
											<div className="flex items-center text-blue-600 mb-4">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 mr-2"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
														clipRule="evenodd"
													/>
												</svg>
												<span>Secure Payment</span>
											</div>
											<p className="text-gray-600 text-sm">
												Your payment information is encrypted and secure. We do
												not store your credit card details.
											</p>
										</div>
									</div>
								)}

								<div className="flex justify-between items-center">
									<Link
										to="/checkout"
										className="text-blue-600 hover:text-blue-800 transition-colors"
									>
										Return to Shipping
									</Link>

									<button
										type="submit"
										disabled={isProcessing}
										className={`bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition-colors ${isProcessing ? "opacity-70 cursor-not-allowed" : ""}`}
									>
										{isProcessing ? (
											<span className="flex items-center">
												<svg
													className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>
												Processing...
											</span>
										) : (
											"Complete Order"
										)}
									</button>
								</div>
							</form>
						</div>

						{/* Order Summary */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
								<h2 className="text-xl font-semibold mb-6">Order Summary</h2>

								<div className="divide-y">
									{cart.map((item) => (
										<div key={item.id} className="py-3 flex">
											<div className="flex-shrink-0 mr-3">
												<img
													src={item.image}
													alt={item.name}
													className="w-16 h-16 object-cover rounded"
												/>
											</div>
											<div className="flex-grow">
												<h3 className="font-medium">{item.name}</h3>
												<p className="text-gray-600 text-sm">
													Qty: {item.quantity}
												</p>
												<p className="font-medium">
													₹
													{(item.price * item.quantity).toLocaleString("en-IN")}
												</p>
											</div>
										</div>
									))}
								</div>

								<div className="border-t pt-4 mt-4 space-y-3">
									<div className="flex justify-between">
										<span className="text-gray-600">Subtotal</span>
										<span className="font-medium">
											₹{subtotal.toLocaleString("en-IN")}
										</span>
									</div>

									<div className="flex justify-between">
										<span className="text-gray-600">Shipping</span>
										<span className="font-medium">
											{shipping === 0
												? "Free"
												: `₹${shipping.toLocaleString("en-IN")}`}
										</span>
									</div>

									<div className="flex justify-between">
										<span className="text-gray-600">Tax (18% GST)</span>
										<span className="font-medium">
											₹
											{tax.toLocaleString("en-IN", {
												maximumFractionDigits: 0,
											})}
										</span>
									</div>

									<div className="border-t pt-3 mt-3">
										<div className="flex justify-between font-bold text-lg">
											<span>Total</span>
											<span>
												₹
												{total.toLocaleString("en-IN", {
													maximumFractionDigits: 0,
												})}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Payment;
