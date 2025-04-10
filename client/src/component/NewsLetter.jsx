const NewsLetter = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-4 mt-24 pb-14">
            <h1 className="md:text-4xl text-2xl font-semibold text-primary">Never Miss a Deal!</h1>
            <p className="md:text-lg text-gray-500/70 pb-6">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>
            <form className="flex flex-col md:flex-row items-center justify-between max-w-2xl w-full space-y-4 md:space-y-0">
                <input
                    className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full px-4 text-gray-600 focus:ring-2 focus:ring-primary"
                    type="email"
                    placeholder="Enter your email id"
                    required
                />
                <button 
                    type="submit" 
                    className="w-full md:w-auto md:px-12 px-8 h-12 text-white bg-indigo-500 hover:bg-indigo-600 transition-all cursor-pointer rounded-md mt-2 md:mt-0"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default NewsLetter;
