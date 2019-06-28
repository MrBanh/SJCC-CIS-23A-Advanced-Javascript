const randomBackgroundColor = () => {
    let red = Math.ceil(Math.random() * 255);
    let green = Math.ceil(Math.random() * 255);
    let blue = Math.ceil(Math.random() * 255);

    return `rgb(${red}, ${green}, ${blue})`;
}

const createEventListeners = () => {
    // Change the page background color for every click of a button using js
    const bodyTag = document.querySelector("body");
    document.addEventListener("click", () => {
        bodyTag.style.background = randomBackgroundColor();
    });
    // TODO: Create a rectangle or circular shape stop-watch (start/stop timer) with 24 hours max duration
    // TODO: https://www.youtube.com/watch?v=1INmsFnD-u4
    // TODO: Take output screen shots and upload with associated source code
}

export {
    createEventListeners
};