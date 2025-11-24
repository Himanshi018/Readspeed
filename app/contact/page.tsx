export default function Contact() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="space-y-6 text-gray-700">
        <p>
          Have questions or need assistance? Our team is here to help you. Please use the information 
          below to get in touch with us.
        </p>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Email</h2>
          <p>support@readspeed.com</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Business Hours</h2>
          <p>Monday - Friday: 9:00 AM - 6:00 PM (IST)</p>
          <p>Saturday - Sunday: Closed</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Mailing Address</h2>
          <p>123 Tech Park, Sector 15</p>
          <p>New Delhi, 110001</p>
          <p>India</p>
        </div>
      </div>
    </main>
  );
}
