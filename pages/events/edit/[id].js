import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import Link from "next/link";
import { toast } from "react-toastify";

import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import dayjs from "dayjs";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import { parseCookies } from "@/helpers/index";

const EditEventPage = ({ event, jwt }) => {
  const { id } = event;
  const {
    name,
    performers,
    venue,
    address,
    date,
    time,
    description,
    image,
    slug,
  } = event.attributes;
  const imagePreviewDefault =
    image.data?.attributes.formats.thumbnail.url || null;

  const [values, setValues] = useState({
    name,
    performers,
    venue,
    address,
    date: dayjs(date).format("YYYY-MM-DD"),
    time,
    description,
  });

  const [imagePreview, setImagePreview] = useState(imagePreviewDefault);
  const [isModal, setIsModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some(element => !element);
    if (hasEmptyFields) {
      toast.error("please fill in all fields");
      return;
    }

    const res = await fetch(`${API_URL}/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ data: values }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      toast.error(error?.message || "Something Went Wrong");
      return;
    }

    const { data } = await res.json();
    const { slug } = data.attributes;
    router.push(`/events/${slug}`);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/api/events/${id}?[populate]=*`);
    const { data } = await res.json();
    setImagePreview(
      data.attributes.image.data.attributes.formats.thumbnail.url
    );
    setIsModal(false);
  };

  return (
    <Layout title={"Edit Event"}>
      <Link href={"/account/dashboard"}>{"<"} Go Back</Link>
      <h1>Edit Event</h1>
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

        <input type='submit' value='Update Event' className='btn' />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image
          src={imagePreview}
          height={100}
          width={170}
          alt='Event Image Thumbnail'
        />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
        <button className='btn-secondary' onClick={() => setIsModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={isModal} onClose={() => setIsModal(false)}>
        <ImageUpload eventId={id} imageUploaded={imageUploaded} jwt={jwt} />
      </Modal>
    </Layout>
  );
};

export default EditEventPage;

export async function getServerSideProps({ req, query: { id } }) {
  const { jwt } = parseCookies(req);
  const res = await fetch(
    `${API_URL}/api/events?filters[id][$eq]=${id}&[populate]=*`
  );
  const events = await res.json();
  if (!events.data.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: { event: events.data[0], jwt },
  };
}
