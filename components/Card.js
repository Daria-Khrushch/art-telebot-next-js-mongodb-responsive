"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const Card = ({ channel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [value, setValue] = useState(1);
  const [buyer, setBuyer] = useState("user");
  const [email, setEmail] = useState("user@gmail.com");
  const [phone, setPhone] = useState("+38095000000");
  const [telegram, setTelegram] = useState("@user");
  const [description, setDescription] = useState("I want to buy");
  const [format, setFormat] = useState("1/24");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setPrice(channel.cpv);
  }, [channel]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка наличия обязательных полей
    const validationErrors = {};
    if (!buyer) {
      validationErrors.buyer = "Пожалуйста, введите ваше имя";
    }
    if (!email) {
      validationErrors.email = "Пожалуйста, введите вашу электронную почту";
    }
    if (!phone) {
      validationErrors.phone = "Пожалуйста, введите ваш номер телефона";
    } else if (!/^\+?\d+$/.test(phone)) {
      validationErrors.phone = "Номер телефона должен содержать только цифры";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      const res = await fetch("/api/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyer_name: buyer,
          buyer_phone: phone,
          buyer_email: email,
          buyer_description: description,
          buyer_telegram: telegram,
          ads_format: format,
          ads_quantity: value,
          ads_sum: price,
          channel_name: channel.name,
          channel_id: channel.id,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          // Обработка успешного ответа
          // console.log(result);
        })
        .catch((error) => {
          // Обработка ошибок
          console.error(error);
        });
    }

    setBuyer("");
    setEmail("");
    setPhone("");
    setDescription("");
    setTelegram("");
    setErrors({});
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event) => {
   
    const valueToNum = parseInt(event.target.value)
    setValue(valueToNum);
    setPrice(channel.cpv * valueToNum);
  };

  const handleFormatChange = (event) => {
    const value = event.target.value;
    setFormat(value);
  };
  return (
    <>
      <div className="card">
        <div className="logo">
          <Image src={channel.avatar} alt="" width={80} height={80} />
        </div>
        <hr />
        <div className="title">
          <h3 className="name">{channel.name}</h3>
          <span className="desc">{channel.description}</span>
          {/* <span className="desc">{channel.theme}</span> */}
        </div>
        <hr />
        <div className="meta">
          <div>
            <h3>Подписчики</h3>
            <span>{channel.subscribers}</span>
          </div>
          <hr />
          <div>
            <h3>Просмотры</h3>
            <span>{channel.views}</span>
          </div>
        </div>
        <hr />

        <div className="setting">
          <div>
            <span>Формат</span>
            <select name="" id="" value={format} onChange={handleFormatChange}>
              <option value="1/24">1/24</option>
              <option value="2/48">2/48</option>
              <option value="3/72">3/72</option>
              <option value="Нативный">Нативный</option>
              <option value="Без удаления">Без удаления</option>
              <option value="Репост">Репост</option>
            </select>
          </div>
          <div>
            <span>Количество</span>
            <input
              type="number"
              name=""
              id=""
              min={0}
              value={value}
              onInput={handleChange}
            />
          </div>
          <hr />
          <span className="sum">{price}</span>
        </div>

        <hr />
        <div className="adding" onClick={openModal}>
          <Image
            src="/assets/images/add-to-cart.png"
            alt="cart"
            width={35}
            height={35}
            onClick={openModal}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3>
          Спасибо за ваш интерес к рекламе в нашем телеграм-канале! Пожалуйста,
          оставьте свои данные ниже, и мы свяжемся с вами в ближайшее время:
        </h3>
        <form id="buyer-modal-form" onSubmit={handleSubmit} className="modal-form">
          <label className="modal-label">
            Ваше имя:
            <input
              className="modal-input"
              type="text"
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
            />
            {errors.buyer && <span className="error">{errors.buyer}</span>}
          </label>

          <label className="modal-label">
            Электронная почта:
            <input
              className="modal-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label className="modal-label">
            Номер телефона:
            <input
              className="modal-input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>

          <label className="modal-label">
            Ваш логин в Telegram:
            <input
              className="modal-input"
              type="tel"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
            {errors.telegram && (
              <span className="error">{errors.telegram}</span>
            )}
          </label>

          <label className="modal-label">
            Краткое описание рекламной кампании:
            <textarea
              className="modal-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>

          <button type="submit">Отправить</button>
        </form>
      </Modal>
    </>
  );
};

export default Card;
