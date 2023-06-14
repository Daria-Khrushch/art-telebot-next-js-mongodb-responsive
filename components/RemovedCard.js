"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import moment from "moment";

const RemovedCard = ({ channel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [format, setFormat] = useState("1/24");
  const [price, setPrice] = useState(0);
  const [value, setValue] = useState(1);
  const [channelName, setChannelName] = useState(channel.name);
  const [ava, setAva] = useState(channel.avatar);
  const [theme, setTheme] = useState(channel.theme);
  const [language, setLanguage] = useState(channel.language);
  const [description, setDescription] = useState(channel.description);
  const [subscribers, setSubscribers] = useState(channel.subscribers);
  const [views, setViews] = useState(channel.views);
  const [cpv, setCpv] = useState(channel.cpv);
  const [shown, setShown] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setPrice(channel.cpv);
  }, [channel]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка наличия обязательных полей
    const validationErrors = {};
    if (!channelName) {
      validationErrors.channelName = "Пожалуйста, введите название канала";
    }
    if (!ava) {
      validationErrors.ava = "Пожалуйста, введите URL картинки";
    }
    if (!theme) {
      validationErrors.theme = "Пожалуйста, введите тему канала";
    }
    if (!language) {
      validationErrors.language = "Пожалуйста, введите язык канала";
    }
    if (!description) {
      validationErrors.description = "Пожалуйста, введите описание канала";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      const res = await fetch("/api/cards/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: channel.id,
          avatar: ava,
          name: channelName,
          theme: theme,
          language: language,
          description: description,
          subscribers: subscribers,
          views: views,
          cpv: cpv,
          is_shown: shown,
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

    setChannelName("");
    setAva("");
    setTheme("");
    setDescription("");
    setLanguage("");
    setCpv(0);
    setSubscribers(0);
    setViews(0);
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
    const valueToNum = parseInt(event.target.value);
    setValue(valueToNum);
    setPrice(channel.cpv * valueToNum);
  };

  const handleFormatChange = (event) => {
    const value = event.target.value;
    setFormat(value);
  };

  const handleShow = (event) => {
    event.preventDefault();
    const valueToNum = parseInt(event.target.value);
    setShown(valueToNum);
  };
  return (
    <>
      <div className="card removed-card">
        <div className="logo removed-logo">
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
            src="/assets/images/edit.png"
            alt="cart"
            width={24}
            height={24}
            onClick={openModal}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form
          id="admin-modal-form"
          onSubmit={handleSubmit}
          className="modal-form"
        >
          <label className="modal-label">
            Название:
            <input
              className="modal-input"
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            {errors.channelName && (
              <span className="error">{errors.channelName}</span>
            )}
          </label>

          <label className="modal-label">
            Аватар:
            <input
              className="modal-input"
              type="text"
              value={ava}
              onChange={(e) => setAva(e.target.value)}
            />
            {errors.ava && <span className="error">{errors.ava}</span>}
          </label>

          <label className="modal-label">
            Тема:
            <input
              className="modal-input"
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
            {errors.theme && <span className="error">{errors.theme}</span>}
          </label>

          <label className="modal-label">
            Язык канала:
            <input
              className="modal-input"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            {errors.language && (
              <span className="error">{errors.language}</span>
            )}
          </label>

          <label className="modal-label">
            Количество просмотров:
            <input
              className="modal-input"
              type="number"
              inputMode="numeric"
              value={views}
              onChange={(e) => setViews(parseInt(e.target.value))}
            ></input>
          </label>
          <label className="modal-label">
            Колличество подписчиков:
            <input
              className="modal-input"
              type="number"
              inputMode="numeric"
              value={subscribers}
              onChange={(e) => setSubscribers(parseInt(e.target.value))}
            ></input>
          </label>
          <label className="modal-label">
            CPV:
            <input
              className="modal-input"
              type="number"
              inputMode="numeric"
              value={cpv}
              onChange={(e) => setCpv(parseInt(e.target.value))}
            ></input>
          </label>

          <label className="modal-label">
            Описание:
            <textarea
              className="modal-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>

          <label className="modal-label">
            <select
              className="modal-input"
              onChange={(event) => handleShow(event)}
            >
              <option value="1">Показать</option>
              <option value="0">Скрыть</option>
            </select>
          </label>

          <button type="submit">Отправить</button>
        </form>
      </Modal>
    </>
  );
};

export default RemovedCard;
