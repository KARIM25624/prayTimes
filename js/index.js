let cities = [
    {
        arabicName: 'القاهرة',
        name: 'Cairo'
    },
    {
        arabicName: 'الاسكندرية',
        name: 'Alexandria'
    },
    {
        arabicName: 'الجيزة',
        name: '	Giza'
    },
    {
        arabicName: 'بني سويف',
        name: '	Beni Suef'
    },
    {
        arabicName: 'اسوان',
        name: '	Aswan'
    },
    {
        arabicName: 'قنا',
        name: 'Qena'
    },
    {
        arabicName: 'الأسماعيلية',
        name: 'Ismailia'
    },
    {
        arabicName: "الدقهلية",
        name: '		Dakahlia'
    },
    {
        arabicName: "الغربية",
        name: 'Gharbia'
    },
    {
        arabicName: "المنيا",
        name: 'Minya'
    },
];
//to full select by option using cities array
for (city of cities) {
    const content =
        `
        <option>${city.arabicName}</option>
        `
    document.getElementById("cities").innerHTML += content;
}
//to compare betwwen value in select and city name if they equal then cityName willbe equal city.name////
document.getElementById('city').innerHTML = ''
document.getElementById("cities").addEventListener("change", function () {

    let cityName = '';
    for (let city of cities) {
        if (city.arabicName == this.value) {
            cityName = city.name
        }
    }
    getApi(cityName);
    document.getElementById('city').innerHTML = this.value

})

function getApi(cityName) {
    let params = {
        country: "EG",
        city: cityName
    }
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params


    })
        .then(function (response) {
            //////
            const timings = response.data.data.timings;
            fillTimeForPrayer('fajr', timings.Fajr + ' AM');
            fillTimeForPrayer('shrouk', timings.Sunrise + ' AM');
            fillTimeForPrayer('duhr', timings.Dhuhr + ' PM');
            fillTimeForPrayer('sunset', timings.Asr + ' PM');
            fillTimeForPrayer('magrb', timings.Maghrib + ' PM');
            fillTimeForPrayer('mednight', timings.Isha + ' PM');
            /////
            const date = response.data.data.date;
            const readable = date.readable;
            const weekDay = date.hijri.weekday.ar;
            ////
            document.getElementById("date").innerHTML = `${weekDay} ${readable}`
            // console.log(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
// getApi();

function fillTimeForPrayer(id, time) {
    document.getElementById(id).innerHTML = time
}