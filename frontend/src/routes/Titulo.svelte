<script>
    let nombre="Maki"
    let cambiarNombre=()=>{
        nombre=prompt("ingrese segundo nombre:")
    
    }
</script>


<h1 id="Titulo"> buenas {nombre}</h1>
<button on:click={cambiarNombre}>cambiar nombre</button>



<style>
#Titulo{
    color : blue;
	font-family:cursive ;

}

</style>