import { obtenerListaRecetas, obtenerDatosRecetas } from "./app.js"

document.addEventListener("DOMContentLoaded", e => {
    obtenerListaRecetas();
})

document.getElementById("searchForm").addEventListener("submit", e => {
    obtenerDatosRecetas();
    e.preventDefault();
})