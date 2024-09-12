const idRecetas = new Map();

async function obtenerListaRecetas() {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

    try {
        const response = await fetch(url);
        if(!response.ok) {
            const mensaje = `No fue posible acceder a la ruta: ${response.status}`;
            throw new Error(mensaje);
        }
        const recetas = await response.json();
        anadirRecetas(recetas.categories);
        listaRecetas(recetas.categories);
    } catch (error) {
        return error;
    }
}

const anadirRecetas = recetas => 
    recetas.forEach(receta => {
        idRecetas.set(receta.strCategory, receta.idCategory)
    });

const listaRecetas = recetas => {
    const listaRecetas = document.getElementById("listaRecetas");
    recetas.forEach(receta => {
        const opcion = document.createElement("option");
        opcion.value = receta.strCategory;
        opcion.textContent = receta.strCategory;
        listaRecetas.appendChild(opcion)
    })
}

async function obtenerDatosRecetas() {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
    try {
        const response = await fetch(url);
        if(!response.ok) {
            const mensaje = `No fue posible acceder a la ruta: ${response.status}`;
            throw new Error(mensaje);
        }

        const recetas = await response.json()        
        obtenerReceta(recetas)
    } catch (error) {
        return error;
    }
}

const obtenerReceta = recetas => {
    const opcion = document.getElementById("listaRecetas").value;
    const obtenerId = idRecetas.get(opcion)
    const receta = recetas.categories.find(receta => receta.idCategory == obtenerId)
    mostrarReceta(receta)
}

const mostrarReceta = receta => {
    const contenedorReceta = document.getElementById("section__content");
    contenedorReceta.innerHTML = `
        <div class="receta">
            <div class="receta__img">
                <img src="${receta.strCategoryThumb}" alt="${receta.strCategory}">
            </div>
            <div class="receta__titulo">
                <p class="receta__titulo_texto">${receta.strCategory}</p>
            </div>
            <div class="receta__descripcion">
                <p class="receta__descripcion_texto">
                    ${receta.strCategoryDescription}
                </p>
            </div>
        </div>
    `
}

export {obtenerListaRecetas, obtenerDatosRecetas};