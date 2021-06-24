"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const buttonBuy = document.querySelector(".product__buy");
  const modalWp = document.querySelector(".modal-wrapper");
  const modal = document.querySelector(".modal");
  const buttonSize = document.querySelectorAll(".radio");
  const buttonAdd = document.querySelector(".modal__button");
  const body = document.querySelector(".body");

  function showModal() {
    modalWp.classList.add("show");
    modalWp.classList.remove("hide");
    document.body.style.overflow = "hidden";
    buttonSize.forEach((button) => {
      button.style.color = "black";
      button.checked = "";
    });
  }

  function closeModal() {
    modalWp.classList.remove("show");
    modalWp.classList.add("hide");
    document.body.style.overflow = "";
  }

  buttonBuy.addEventListener("click", () => {
    showModal();
  });

  buttonAdd.addEventListener("click", () => {
    buttonSize.forEach((button) => {
      if (button.checked) {
        closeModal();
      } else {
        button.style.color = "red";
      }
    });
  });

  modal.addEventListener("click", (e) => {
    if (
      Array.from(buttonSize).some((i) => {
        return i === e.target;
      })
    ) {
      buttonSize.forEach((button) => {
        button.style.color = "black";
      });
    }
  });

  modalWp.addEventListener("click", (e) => {
    if (e.target === modalWp) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modalWp.classList.contains("show")) {
      closeModal();
    }
  });
});
