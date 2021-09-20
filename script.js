const createElement = (name, id, innertext = '', type) => {
  name = document.createElement(type);
  name.id = id;
  name.innerText = innertext;
  document.querySelector('.container').appendChild(name);
};

const getRandomImage = async () => {
  try {
    const resp = await fetch('https://picsum.photos/v2/list?page=2&limit=100');
    const images = await resp.json();
    displayImage(images);
    console.log(images);
  } catch (error) {
    console.log(error);
  }
};

getRandomImage();

const displayImage = (images) => {
  createElement('div', 'root', '', 'div');
  createElement('modal', 'modal', '', 'div');
  const root = document.getElementById('root');
  root.innerHTML =
    images &&
    images
      .map(
        (img) => /*html*/ `
          <img data-url=${img.download_url} id=${img.id} src=${
          img.download_url
        }  alt=${img.author.replace(' ', '-')}  />`
      )
      .join('');

  const imgs = document.querySelectorAll('img');

  imgs.forEach((img) => {
    img.addEventListener('click', () => zoomImage(img.dataset.url, img.alt));
  });
};

function zoomImage(url, author) {
  author = author.replace('-', ' ');
  const modal = document.querySelector('#modal');
  modal.style.display = 'block';
  document.body.style = 'overflow:hidden';
  modal.innerHTML = /*html*/ `
  <div>
    <img src=${url} alt=${author} />
    <p class='author'>${author}</p>
    <i class="fa fa-times fa-2x" aria-hidden="true" title='close'></i>
  </div>
`;
  document.querySelector('.fa').addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style = 'overflow:scroll';
  });
}
