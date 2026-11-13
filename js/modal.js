export function showModal(title, message) {
    const modalOverlay = document.querySelector("#modal-overlay");
    const modalIcon = document.querySelector("#modal-icon");
    const modalTitle = document.querySelector("#modal-title");
    const modalMessage = document.querySelector("#modal-message");
    const successButton = document.querySelector("#modal-success");

    return new Promise((resolve) => {
        modalOverlay.hidden = false;
        modalIcon.src = "assets/icons/success.png";
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        successButton.hidden = false;

        successButton.onclick = () => {
            modalOverlay.hidden = true;
            successButton.hidden = true;
            resolve();
        }
    })
}

export function confirmModal(title, message) {
    const modalOverlay = document.querySelector("#modal-overlay");
    const modalIcon = document.querySelector("#modal-icon");
    const modalTitle = document.querySelector("#modal-title");
    const modalMessage = document.querySelector("#modal-message");
    const cancelButton = document.querySelector("#modal-cancel");
    const confirmButton = document.querySelector("#modal-confirm");

    return new Promise((resolve) => {
        modalOverlay.hidden = false;
        modalIcon.src = "assets/icons/warning.png";
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        cancelButton.hidden = false;
        confirmButton.hidden = false;
        
        confirmButton.onclick = () => {
            modalOverlay.hidden = true;
            cancelButton.hidden = true;
            confirmButton.hidden = true;
            resolve(true);
        }

        cancelButton.onclick = () => {
            modalOverlay.hidden = true;
            cancelButton.hidden = true;
            confirmButton.hidden = true;
            resolve(false);
        }
    })
}