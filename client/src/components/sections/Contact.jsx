import { useState } from "react";
import Container from "../layout/Container";
import Card from "../common/Card";
import Button from "../common/Button";
import { sendMessage } from "../../services/messageService";
import "./Contact.css";

const EMPTY_FORM = { name: "", email: "", message: "" };

function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      await sendMessage(form);
      setForm(EMPTY_FORM);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Failed to send message");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="contact-section">
      <Container>
        <h2 className="section-title">Contact Me</h2>
        <Card className="contact-section__card">
          <p className="contact-section__intro">
            Have a project in mind or just want to say hi? Send me a message below.
          </p>

          {status === "success" && (
            <p className="contact-section__success">
              Thanks! Your message has been sent. I'll get back to you soon.
            </p>
          )}
          {status === "error" && <p className="contact-section__error">{error}</p>}

          <form onSubmit={handleSubmit} className="contact-section__form">
            <label className="contact-section__field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="contact-section__field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="contact-section__field">
              <span>Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </label>

            <Button type="submit" variant="primary" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Card>
      </Container>
    </section>
  );
}

export default Contact;