import { FaMapMarker, FaMoneyBillWave } from 'react-icons/fa';
import './OverviewCard.css';

const OverviewCard = () => {
  return (
    <div className='outer-div'>
      <div className='header'>
        <h3>Basic Details</h3>
        <button className='edit-btn'>Edit</button>
      </div>
      <div className='main-div'>
        <div className='userdetails'>
          <div className='image'>
            <img
              src='https://imgs.search.brave.com/uyA_EfHeVrK6TtNYrqdiZ5Ja0DYTr5fXzs2WbTL0wOo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdDMu/ZGVwb3NpdHBob3Rv/cy5jb20vNjY3Mjg2/OC8xMzcwMS92LzQ1/MC9kZXBvc2l0cGhv/dG9zXzEzNzAxNDEy/OC1zdG9jay1pbGx1/c3RyYXRpb24tdXNl/ci1wcm9maWxlLWlj/b24uanBn'
              alt='Profile '
              className='profile-image'
            />
          </div>
          <div className='box'>
            <div className='credentials'>
              <h3 className='name'>User Name</h3>
              <h3 className='email'>example@gmail.com</h3>
            </div>
            <h3 className='designation'>Owner</h3>
          </div>
        </div>
        <div className='single-row'>
          <FaMapMarker className='icon' />
          <h3 className='key'>Location</h3>
          <h3 className='value'>Delhi</h3>
        </div>
        <div className='single-row'>
          <FaMoneyBillWave className=' icon' />
          <h3 className='key'>Price Plan</h3>
          <h3 className='value'>Yearly</h3>
        </div>
        <div className='single-row'>
          <FaMoneyBillWave className='icon' />
          <h3 className='key'>Pricing Start Date</h3>
          <h3 className='value'>StartDate</h3>
        </div>
        <div className='single-row'>
          <FaMoneyBillWave className='icon' />
          <h3 className='key'>Pricing End Date</h3>
          <h3 className='value'>EndDate</h3>
        </div>
        <div className='single-row'>
          <h3 className='key'>Color Theme</h3>
          <input className='value' type='color' id='favcolor' name='favcolor' value='#ff0000' />
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
