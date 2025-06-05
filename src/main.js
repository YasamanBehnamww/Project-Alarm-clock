const selectHour = document.getElementById("selectHour");
const selectMinute = document.getElementById("selectMinute");
const timerBox = document.getElementById("time");
const setAlarmBtn = document.getElementById("setAlarmBtn");
let alarmTime = null;
let alarmSet = false;
const ringtone = new Audio('../public/files/Alarm-Clock.mp3');

for (let i = 0; i <= 23; i++) {
    let hour = i < 10 ? '0' + i : i;
    let option = `<option value="${hour}">${hour}</option>`;
    selectHour.insertAdjacentHTML('beforeend', option);
}

for (let i = 0; i <= 59; i++) {
    let minute = i < 10 ? '0' + i : i;
    let option = `<option value="${minute}">${minute}</option>`;
    selectMinute.insertAdjacentHTML('beforeend', option);
}

setInterval(() => {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    timerBox.innerHTML = `${h}:${m}:${s}`;

    if (alarmSet && alarmTime === `${h}:${m}`) {
        ringtone.play();
        ringtone.loop = true;
        // غیر فعال کردن select ها و تغییر متن دکمه
        selectHour.disabled = true;
        selectMinute.disabled = true;
        setAlarmBtn.innerText = "Clear Alarm";
    }
}, 1000);

setAlarmBtn.addEventListener("click", () => {
    if (!alarmSet) {
        const hour = selectHour.value;
        const minute = selectMinute.value;

        if (!hour || !minute) {
            alert("لطفاً ساعت و دقیقه را انتخاب کنید.");
            return;
        }

        alarmTime = `${hour}:${minute}`;
        alarmSet = true;
        alert(`آلارم برای ساعت ${hour}:${minute} تنظیم شد!`);
        // بعد از تنظیم آلارم، می‌تونیم اینجا هم select ها رو فعال نگه داریم تا کاربر بتونه تغییر بده
        selectHour.disabled = false;
        selectMinute.disabled = false;
        setAlarmBtn.innerText = "Clear Alarm";
    } else {
        // پاک کردن آلارم و توقف زنگ
        alarmTime = null;
        alarmSet = false;
        ringtone.pause();
        ringtone.currentTime = 0;
        selectHour.disabled = false;
        selectMinute.disabled = false;
        setAlarmBtn.innerText = "Set Alarm";
    }
});
