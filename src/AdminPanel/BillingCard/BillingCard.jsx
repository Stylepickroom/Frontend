import '../BillingCard/BillingCard.css';

const BillingCard = () => {
  return (
    <div className='master outer-div bg-white rounded-lg shadow-lg p-8 max-w-xl mx-auto my-16 '>
      <div className='header'>
        <h3 className='text-3xl font-bold text-gray-700 mb-2'>Billing Details</h3>
        <button className='edit-btn px-4 py-2 bg-blue-500 text-white rounded-md'>Edit</button>
      </div>
      <div className='billing-container'>
        <div className=''>
        </div>
      </div>
    </div>
  );
};

export default BillingCard;
