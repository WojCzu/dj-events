import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "@/config/index";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/Form.module.css";
import { parseCookies } from "@/helpers/index";

const AddEventPage = ({ jwt }) => {
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some(element => !element);
    if (hasEmptyFields) {
      return toast.error("please fill in all fields");
    }

    const res = await fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ data: values }),
    });

    if (!res.ok) {
      return toast.error("something went wrong");
    }

    const { data } = await res.json();
    const { slug } = data.attributes;
    router.push(`/events/${slug}`);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title={"Add New Event"}>
      <Link href={"/events"}>Go Back</Link>
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            name='description'
            id='description'
            type='text'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Add Event' className='btn' />
      </form>

      <ToastContainer theme='colored' position='bottom-right' />
    </Layout>
  );
};

export default AddEventPage;

export async function getServerSideProps({ req }) {
  const { jwt } = parseCookies(req);

  return {
    props: {
      jwt,
    },
  };
}
