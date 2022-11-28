import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Payment = ({sellerPrice, data}) => {
  console.log(data)
      const stripe = useStripe();
      const elements = useElements();
    const [cardError, setCardError]=useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [orderId, setOrderId]=useState(data?._id);
    const [paymentSuccess, setPaymentSuccess]=useState('');
    const navigate = useNavigate();
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          headers:{
            authorization: `bearer ${localStorage.getItem('myKey')}`
          }
         },
        body: JSON.stringify({ price: sellerPrice }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, [sellerPrice]);

// console.log(clientSecret);
        const handleSubmit= async(e)=>{
            e.preventDefault();

            if(!stripe || !elements){
                return;
            }
            const card = elements.getElement(CardElement);
            if(card==null){
                return;
            }

            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card,
              });
              if(error){
                Swal.fire({
                    icon: 'error',
                    title: error?.code,
                    text: error?.message,
                  })
                // console.log(error);
              }
           
              const {paymentIntent, error: confirmError}= await stripe.confirmCardPayment(
                
                clientSecret,
                {
                    payment_method:{
                      card: card,
                      billing_details:{
                        name: data?.buyerFullName,
                        email: data?.buyerEmail
                      },
                    }
                  
                },
              )
              if(confirmError){
                Swal.fire({
                  icon: 'error',
                  title: confirmError?.code,
                  text: confirmError?.message,
                })
                // console.log(confirmError)
              }
              if(paymentIntent?.status ==='succeeded'){
                setPaymentSuccess(paymentIntent?.status);
                fetch(`http://localhost:5000/myOrderPayment/${orderId}`,{
                  method: "PUT",
                  headers:{
                    authorization: `bearer ${localStorage.getItem('myKey')}`
                }
                })
                .then(res=>res.json())
                .then(data=>{
                  // console.log(data);
                  if(data?.acknowledged){
                    navigate('/myOrder')
                  }
                })
                Swal.fire({
                  icon: 'success',
                  title: paymentIntent?.status,
                  text: "Payment Completed",
                })
              }
              // console.log(paymentIntent)
        }
        
    return (
        <div className='mt-3'>
                <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button onClick={()=>setOrderId(data?._id)}  className="btn btn-primary w-full mt-3 text-xl font-semibold text-black" disabled={!stripe || !clientSecret}>
        Pay
        </button>
    </form>
                </div>

    );
};

export default Payment;