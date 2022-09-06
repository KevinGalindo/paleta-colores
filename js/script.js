/*----------------------------------------------------------------------------------------------*/
/*--------------------------------------Section subir con input---------------------------------*/
/*----------------------------------------------------------------------------------------------*/

const divImagen = document.querySelector('tamano');

const archivo = document.getElementById('btn-subir');
archivo.addEventListener("change",(e)=>{
    leerArchivo(archivo.files)
})

const leerArchivo = ar => {
    for (let i = 0; i < ar.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(ar[i]);
        reader.addEventListener("load",(e)=>{

            crearImg(e.currentTarget.result);

        });
    }
}

/*----------------------------------------------------------------------------------------------*/
/*--------------------------------------Section subir con Drag----------------------------------*/
/*----------------------------------------------------------------------------------------------*/

const zona = document.querySelector(".drap");

// Cuando mueves el objeto por encima del div
zona.addEventListener("dragover", e=>{
    e.preventDefault();
    document.querySelector(".fa-solid").classList.remove('fa-image', 'fa-box-open');
    changeStyle(e.srcElement, 'solid', 'fa-box-open','Suelta');
});

// Cuando quitas el objeto de encima del div
zona.addEventListener("dragleave", e=>{
    e.preventDefault();
    changeStyle(e.srcElement, 'dashed', 'fa-box-open','Sube una imagen');
    document.querySelector(".fa-solid").classList.replace('fa-box-open', `fa-box`);
});

// Cuando sueltas el objeto encima del div
zona.addEventListener("drop",e=>{
    e.preventDefault();
    leerImg(e.dataTransfer.files[0]);

});


const changeStyle = (obj,color, icono,text)=>{
    obj.style.outline = `4px ${color} #959595`;
    document.querySelector("#text-subir").textContent = `${text}`;
    document.querySelector(".fa-solid").classList.add(`${icono}`);
}


/*----------------------------------------------------------------------------------------------*/
/*--------------------------------------Crear img en el html  ----------------------------------*/
/*----------------------------------------------------------------------------------------------*/

const leerImg = ar => {

    const reader = new FileReader();
    reader.readAsDataURL(ar);
    reader.addEventListener("load",e=>{

        let url = URL.createObjectURL(ar);
        crearImg(url);

    });
}

/*----------------------------------------------------------------------------------------------*/
/*----------------------------Insertar img en el contenerdor  ----------------------------------*/
/*----------------------------------------------------------------------------------------------*/
const crearImg = img => {

    const contenImg = document.querySelector(".tamano");
    const contenpaleta = document.querySelector(".paleta");
    const h1 = document.querySelector(".h1");
    
    contenpaleta.innerHTML = '';
    contenImg.innerHTML = '';
    h1.innerHTML = '';

    let newImg = `<img id="img" src='${img}'>`;

    document.querySelector("#text-subir").textContent = 'Imagen subida';
    document.querySelector(".fa-solid").classList.replace('fa-image', 'fa-check');

    setTimeout(() =>{
        document.querySelector("#text-subir").textContent = 'Sube una imagen';
        document.querySelector(".fa-solid").classList.replace('fa-check' ,'fa-image');
    },3000 );

    contenImg.innerHTML = newImg;
    colorImagen();
    document.querySelector('.setion-color').classList.add('active');


}

const modalImg = (red,green,blue) => {
    const colorres = document.createElement("DIV");

    // Agragando clases y estilos
    colorres.classList.add('colorres','color-prin');
    colorres.style.background = 'rgb('+red+','+green+','+blue+')';

    // Eventos
    colorres.addEventListener('click', ()=> {
        document.querySelector('.cortina').classList.add('active');
        modalImgTres(red,green,blue);
    });

    return colorres;
}

const btn = document.querySelector('#primer');
const btnDos = document.querySelector('#segundo');
const btnCerrar = document.querySelector('.cerrar');


btnCerrar.addEventListener('click', () => {
    document.querySelector('.cortina').classList.remove('active');
});


// Colores principales
const modalImgUno = (color) => {

    document.querySelector('.top-section').style.background = 'rgb('+color[0][0]+','+color[0][1]+','+color[0][2]+')';
    const texRgb = document.querySelector('#tex-rgb');
    texRgb.textContent = 'rgb('+color[0][0]+','+color[0][1]+','+color[0][2]+')';

}

const modalImgDos = (color) => {

    document.querySelector('.top-section').style.background = 'rgb('+color.r+','+color.g+','+color.b+')';
    document.querySelector('#tex-rgb').textContent = 'rgb('+color.r+','+color.g+','+color.b+')';
}

const modalImgTres = (red,green,blue) => {

    document.querySelector('.top-section').style.background = 'rgb('+red+','+green+','+blue+')';
    document.querySelector('#tex-rgb').textContent = 'rgb('+red+','+green+','+blue+')';
}
/*----------------------------------------------------------------------------------------------*/
/*----------------------------Inicar paleta de colores------------------------------------------*/
/*----------------------------------------------------------------------------------------------*/

const colorImagen = () =>{

    const canvas = document.getElementById("canvass");
    const div = document.getElementById("primer");
    const divDos = document.getElementById("segundo");
    const paletaDiv = document.querySelector('.paleta');
    const imgCirculo = document.querySelector('.pic');
    const ctx = canvas.getContext('2d');
    
    const image = document.getElementById("img");
    imgCirculo.innerHTML = `<img src="${image.src}" alt="image">`;
    image.setAttribute('crossOrigin', 'anonymous');

    function functionCavas() {

        image.addEventListener('load', () => {
            canvas.width = image.width;
            canvas.height = image.height;

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            const color = getColor(ctx);
            const colorDos = getColorDos(ctx); 
            

            divDos.style.background = 'rgb('+colorDos.r+','+colorDos.g+','+colorDos.b+')';
            div.style.background = 'rgb('+color[0][0]+','+color[0][1]+','+color[0][2]+')';

            // Parte de peticiones
            btn.addEventListener('click', () => {
                document.querySelector('.cortina').classList.add('active');
                modalImgUno(color);

            }); 
            btnDos.addEventListener('click', () => {
                document.querySelector('.cortina').classList.add('active');
                modalImgDos(colorDos);
            });

            // ------------------------------------------------------------------------------- //
            let paleta = getPaletaColor(ctx);
            let contador = 0;
            const pintarPaleta = (num) => {
                const documentFragment = document.createDocumentFragment();
                for (let i = 0; i < num; i++) {
                    const coloresPaleta = modalImg(paleta[contador].red,paleta[contador].green,paleta[contador].blue);
                    documentFragment.appendChild(coloresPaleta);
                    document.body.style.background = 'linear-gradient(to right, rgb('+paleta[0].red+','+paleta[0].green+','+paleta[0].blue+'),rgb('+paleta[1].red+','+paleta[1].green+','+paleta[1].blue+'),rgb('+paleta[2].red+','+paleta[2].green+','+paleta[2].blue+'))';
                    ++contador;
                }
                paletaDiv.appendChild(documentFragment);
            }  
            pintarPaleta(paleta.length);
          

        });
    }

    /*----------------------------------------------------------------------------------*/
    /*--------------------------Primer metodo-------------------------------------------*/
    /*----------------------------------------------------------------------------------*/
    function getColor(ctx) {

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imgData;
        let length = 20;
        const quality = 10;

        let colorCompleto = [];

        for ( let i = 0,offset,r,g,b,a; i < length; i = i + quality ) {
            offset = i * 4;
            r = data.data[i+0];
            g = data.data[i+1];
            b = data.data[i+2];
            a = data.data[i+3];

            if (a === 'undefined' || a >= 125) {
                if (!(r > 250 && g > 250 && b > 250)){
                    colorCompleto.push([r, g, b]);
                }
            }
        }
        return colorCompleto;
    }

    /*----------------------------------------------------------------------------------*/
    /*--------------------------segundo metodo-------------------------------------------*/
    /*----------------------------------------------------------------------------------*/

    function getColorDos(ctx) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imgData;
        let length = imgData.data.length;
        const quality = 100;
        let rgb = {r:0,g:0,b:0};
        let count = 0;
        let i = -4;

    while ( (i += quality * 4) < length ) {
            ++count
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
    }

    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    
    return rgb;

    }

    /*----------------------------------------------------------------------------------*/
    /*--------------------------tercer metodo-------------------------------------------*/
    /*----------------------------------------------------------------------------------*/

    function getPaletaColor(ctx) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const quality = canvas.width + canvas.height;
        const colors = []
            for (let i = -4; i < canvas.width * canvas.height; i = i + quality) {
                    const offset = i * 4
                    const alpha = imgData[offset + 3]
                    if (alpha > 0) {
                    const red = imgData[offset ]
                    const green = imgData[offset + 1]
                    const blue = imgData[offset + 2]
                    colors.push({ red, green, blue })
                    // console.log('%c color', `background: rgba(${red}, ${green}, ${blue})`)
                }
            }

        return colors
    }

    functionCavas();

}