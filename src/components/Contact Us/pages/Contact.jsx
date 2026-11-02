import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../../ui/PageHeader";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const field =
  "mt-1 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-gray-50 placeholder:text-gray-500";

const Contact = () => {
  const form = useRef();
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!configured) {
      toast.error("The contact form is not configured in this build.");
      return;
    }
    setSending(true);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
      toast.success("Message sent.");
      form.current.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageHeader kicker="Contact" title="Contact the developer" />
      <div className="container-page pb-8">
        {!configured && (
          <p
            role="note"
            className="mb-6 max-w-xl rounded-lg border border-line bg-surface p-4 text-sm text-gray-300"
          >
            Sending is disabled because the EmailJS settings (
            <code>VITE_EMAILJS_*</code>) are not set in this build.
          </p>
        )}
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="max-w-xl space-y-5 rounded-lg border border-line bg-surface p-6"
        >
          <div>
            <label htmlFor="user_email" className="text-sm font-medium text-gray-200">
              Email address
            </label>
            <input
              id="user_email"
              name="user_email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="subject" className="text-sm font-medium text-gray-200">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="What is this about?"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-gray-200">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              placeholder="Write your message"
              className={field}
            />
          </div>
          <button type="submit" disabled={sending || !configured} className="btn-primary w-full">
            {sending ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
