/**
 * @file JavaScript for TAG Assessment.
 */

const fetchPromise = fetch('https://randomuser.me/api/?inc=name,location,email,phone,picture&results=4');
fetchPromise.then(
  response => {
    return response.json()
  })
  .then(data => {
    const content = document.querySelector('.content');
    for(result of data.results) {
      const card = document.createElement('article');
      const hash = Math.random().toString(36).substring(2);
      card.classList.add('container');
      card.innerHTML = `
      <dl class="user" id="user--${hash}">
        <div class="card">
          <div>
            <dt class="user__picture-label visually-hidden">User picture</dt>
            <dd class="user__picture">
              <img class="user__photo" alt="Thumbnail photo of ${result.name.first} ${result.name.last}" src="${result.picture.medium}"/>
            </dd>
            <div>
              <dt class="user__name-label visually-hidden">Name</dt>
              <dd class="user__name">${result.name.first} ${result.name.last}</dt>
            </div>
            <svg class="drop-down-icon" width="12" height="8" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><filter x="-1.9%" y="-5%" width="103.9%" height="114%" filterUnits="objectBoundingBox" id="a"><feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" in="shadowBlurOuter1"/></filter><path id="b" d="M0 0h360v100H0z"/></defs><g fill="none" fill-rule="evenodd"><g transform="translate(-328 -46)"><use fill="#000" filter="url(#a)" xlink:href="#b"/><use fill="#FFF" xlink:href="#b"/></g><path d="M1.41.34L6 4.92 10.59.34 12 1.75l-6 6-6-6z" fill="#E0E0E0"/></g></svg>
            <div>
              <dt class="user__location-label visually-hidden">Location</dt>
              <dd class="user__location">${result.location.city}, ${result.location.country}</dd>
            </div>
          </div>
        </div>
        <div class="card__drawer">
          <div class="card__drawer-slot">
            <dt class="user__phone">Phone</dt>
            <dd class="user__phone">${result.phone}</dd>
          </div>
          <div class="card__drawer-slot">
            <dt class="user__email">Email</dt>
            <dd><a href="mailto:${result.email}">${result.email}</a></dd>
          </div>
        </div>
      </dl>`.trim();
      content.append(card);
      const user = document.querySelector(`#user--${hash}`);
      user.addEventListener('click', function(){
        this.classList.toggle('is-expanded');
      });
    }
  })
  .catch(err => {
    console.error(err);
  });
