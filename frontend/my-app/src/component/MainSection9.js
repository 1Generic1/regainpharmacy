import React, { useState } from 'react';
import './styles/MainSection9.css';

const faqs = [
  {
    question: 'What is your pharmacy about?',
    answer: 'Our pharmacy provides a wide range of medications and health products with a focus on quality and customer service.'
  },
  {
    question: 'How do you handle deliveries?',
    answer: 'We ensure timely and safe delivery of your orders. You can track your delivery in real-time using our app.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including credit/debit cards, online banking, and digital wallets.'
  },
  {
    question: 'Can I return my medications?',
    answer: 'Returns are accepted within 30 days of purchase, provided the medication is unopened and in its original packaging.'
  },
  {
    question: 'Do you offer consultations?',
    answer: 'Yes, we offer free consultations with our licensed pharmacists to help you with any questions or concerns.'
  },
];

function MainSection9() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="main-section-9">
      <div className="faq-header">
        <h1>Frequently Asked Questions (FAQ)</h1>
        <h2>
          Explore commonly asked questions about our pharmacy, delivery, and payment services. 
          Learn about our commitment to quality, how we ensure timely deliveries, the variety 
          of payment options we offer, and the benefits of consulting with our licensed pharmacists. 
          Get all the information you need to make the most of our services.
        </h2>
      </div>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => handleToggle(index)}>
              <h3>{faq.question}</h3>
              <span>{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainSection9;
