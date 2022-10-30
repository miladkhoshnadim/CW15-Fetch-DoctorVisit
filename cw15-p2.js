const selector = document.getElementById("solectDoctors");
const doctorTimes = document.getElementById("doctorTimes");
const selectedTime = document.getElementById("doctorTimes");

document.getElementById("submit").addEventListener("click", function () {
  selector.innerHTML = "<option>chose your doctor</option>";
  fetch("http://localhost:3004/docters")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        selector.innerHTML += `<option value="${element.id}">${element.name}</option>`;
      });
      selector.addEventListener("change", function (e) {
        doctorTimes.innerHTML = '<option value="">chois your time</option>';

        for (const [key, val] of Object.entries(data[e.target.value].time)) {
          doctorTimes.innerHTML += `<option value="${key}" id="${e.target.value}">${key}</option>`;
        }

        console.log("docy send", data[e.target.value]);
        testSelectors(data[e.target.value], data);
      });
    });
});

function testSelectors(docy, data) {
  console.log("docyincoming", docy);
  document
    .getElementById("finalGetTime")
    .addEventListener("click", function () {
      const id = selectedTime.options[selectedTime.selectedIndex].value;
      //   console.log('id', id)
      console.log("docyBEFOR", docy);
      const nameM = document.getElementById("name").value;
      const lastnameM = document.getElementById("lastname").value;
      const numberM = document.getElementById("number").value;

      for (const [key, valtime] of Object.entries(docy.time)) {
        console.log("key", key);
        if (id == key) {
          console.log("inter if", id);
          valtime.name = `${nameM}`;
          valtime.lastname = `${lastnameM}`;
          valtime.number = `${numberM}`;
        }
      }

      fetch(`http://localhost:3004/docters`, {
        method: "post",
        body: JSON.stringify({ name: `${docy.name}`, time: `${docy.time}` }),
        headers: { "Content-Type": "Application/json" },
      });

      fetch(`http://localhost:3004/docters/${docy.id}`, {
        method: "delete",
        headers: { "Content-Type": "Application/json" },
      });

      console.log("docyBEFOR", docy.time);
    });
}
