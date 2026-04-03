import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function ChatWidget() {
  console.log('ChatWidget rendering...');
  
  const [messages, setMessages] = useState([{
    role: 'bot',
    content: '👋 Welcome to Volfram Systems! I\'m your engineering assistant. I can help you with PRDS Stations, Steam Pipe Sizing, and Boiler Systems. What are you looking for today?'
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [calcResults, setCalcResults] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '', email: '', phone: ''
  });
  const bottomRef = useRef(null);

  useEffect(() => {
    console.log('ChatWidget mounted!');
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/chat', {
        message: userMsg,
        session_id: sessionId
      });

      setMessages(prev => [...prev,
        { role: 'bot', content: res.data.reply }
      ]);

      if (res.data.calcResults) {
        setCalcResults(res.data.calcResults);
      }

      // Show inquiry form if bot asks
      if (res.data.reply.toLowerCase().includes('submit inquiry') ||
          res.data.reply.toLowerCase().includes('your name')) {
        setShowInquiryForm(true);
      }
    } catch (err) {
      setMessages(prev => [...prev,
        { role: 'bot', content: 'Sorry, something went wrong. Please try again.' }
      ]);
    }
    setLoading(false);
  };

  const submitInquiry = async () => {
    try {
      await axios.post('http://localhost:8000/api/inquiry', {
        session_id: sessionId,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        product_type: calcResults?.product,
        input_params: calcResults?.inputs,
        calc_results: calcResults?.results
      });

      setShowInquiryForm(false);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: '✅ Your inquiry has been submitted! Volfram team will contact you within 24-48 hours with a detailed quotation. Thank you!'
      }]);
    } catch (err) {
      alert('Error submitting inquiry. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerText}>Volfram Engineering Assistant</span>
        <span style={styles.onlineDot}>● Online</span>
      </div>

      {/* Messages */}
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.bubble,
              ...(msg.role === 'user' ? styles.userBubble : styles.botBubble)
            }}
          >
            {msg.content}
          </div>
        ))}

        {/* Calc Results Card */}
        {calcResults && (
          <div style={styles.resultCard}>
            <h4 style={{ margin: '0 0 10px', color: '#1a365d' }}>📊 Calculation Results</h4>
            {calcResults.results?.inlet && (
              <>
                <p><b>Inlet Line Size:</b> {calcResults.results.inlet.lineSize}</p>
                <p><b>Inlet MOC:</b> {calcResults.results.inlet.moc?.valve} / {calcResults.results.inlet.moc?.flange}</p>
                <p><b>Outlet Line Size:</b> {calcResults.results.outlet.lineSize}</p>
                <p><b>Outlet MOC:</b> {calcResults.results.outlet.moc?.valve} / {calcResults.results.outlet.moc?.flange}</p>
              </>
            )}
            {calcResults.results?.recommendedSize && (
              <p><b>Recommended Pipe Size:</b> {calcResults.results.recommendedSize}</p>
            )}
          </div>
        )}

        {/* Inquiry Form */}
        {showInquiryForm && (
          <div style={styles.inquiryForm}>
            <h4 style={{ margin: '0 0 12px' }}>Submit Your Inquiry</h4>
            <input
              style={styles.formInput}
              placeholder="Your Name *"
              value={customerInfo.name}
              onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            />
            <input
              style={styles.formInput}
              placeholder="Email Address *"
              value={customerInfo.email}
              onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })}
            />
            <input
              style={styles.formInput}
              placeholder="Phone Number"
              value={customerInfo.phone}
              onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            />
            <button
              style={styles.submitBtn}
              onClick={submitInquiry}
              disabled={!customerInfo.name || !customerInfo.email}
            >
              Submit Inquiry →
            </button>
          </div>
        )}

        {loading && (
          <div style={styles.botBubble}>
            <i>Calculating...</i>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <button style={styles.sendBtn} onClick={sendMessage}>
          Send →
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: 420,
    height: 600,
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #e2e8f0',
    borderRadius: 16,
    overflow: 'hidden',
    fontFamily: 'Inter, sans-serif',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
    position: 'fixed',
    bottom: 20,
    right: 20,
    background: '#fff',
    zIndex: 9999
  },
  header: {
    background: 'linear-gradient(135deg, #1a365d, #2d6a9f)',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  headerText: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    flex: 1
  },
  onlineDot: {
    color: '#68d391',
    fontSize: 11
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    background: '#f7fafc'
  },
  bubble: {
    padding: '10px 14px',
    borderRadius: 12,
    maxWidth: '80%',
    fontSize: 13,
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap'
  },
  botBubble: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4
  },
  userBubble: {
    background: '#2d6a9f',
    color: '#fff',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4
  },
  resultCard: {
    background: '#ebf8ff',
    border: '1px solid #bee3f8',
    borderRadius: 12,
    padding: 14,
    fontSize: 13
  },
  inquiryForm: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  formInput: {
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    fontSize: 13,
    outline: 'none'
  },
  submitBtn: {
    background: '#2d6a9f',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    marginTop: 4
  },
  inputArea: {
    display: 'flex',
    padding: 12,
    gap: 8,
    borderTop: '1px solid #e2e8f0',
    background: '#fff'
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    fontSize: 13,
    outline: 'none'
  },
  sendBtn: {
    background: '#2d6a9f',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 16px',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600
  }
};
