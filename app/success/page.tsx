const SuccessPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-3xl font-bold text-center mt-20">
        Payment Successful!
      </h1>
      <p className="text-center mt-4 text-gray-600">
        Thank you for your purchase. Your transaction has been completed
        successfully.
      </p>
    </div>
  );
};

export default SuccessPage;
