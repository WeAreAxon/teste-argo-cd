<script>

export let texto;
export let check = false;

</script>
    <div>
        <label class="flex items-center ml-4">{texto}<input type="checkbox" bind:checked={check} class="ios-switch green"/><div><div></div></div></label>
    </div>

<style>

input[type="checkbox"] { 
	position: absolute;
	opacity: 0;
}

input[type="checkbox"].ios-switch +
div {
    vertical-align: middle;
    width: 40px; height: 20px;
    border: 1px solid rgba(0,0,0,.4);
    border-radius: 999px;
    background-color: rgba(63, 63, 63, 0.975);
    -webkit-transition-duration: .4s;
    -webkit-transition-property: 
    background-color, box-shadow;
    box-shadow: inset 0 0 0 0px
    rgba(0,0,0,0.4);
    margin-left: 8px;
    cursor:pointer;
}

input[type="checkbox"].ios-switch:checked + div {
width: 40px;
background-position: 0 0;
background-color: #3b89ec;
border: 1px solid #0e62cd;
box-shadow: inset 0 0 0 10px rgba(59,137,259,1);
}

input[type="checkbox"].ios-switch + div > div {
	float: left;
	width: 18px; height: 18px;
	border-radius: inherit;
	background: #ffffff;
	-webkit-transition-timing-function: cubic-bezier(.54,1.85,.5,1);
	-webkit-transition-duration: 0.4s;
	-webkit-transition-property: transform, background-color, box-shadow;
	-moz-transition-timing-function: cubic-bezier(.54,1.85,.5,1);
	-moz-transition-duration: 0.4s;
	-moz-transition-property: transform, background-color;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3), 0px 0px 0 1px rgba(0, 0, 0, 0.4);
	pointer-events: none;
	margin-top: 1px;
	margin-left: 1px;
}

input[type="checkbox"].ios-switch:checked + div > div {
	-webkit-transform: translate3d(20px, 0, 0);
	-moz-transform: translate3d(20px, 0, 0);
	background-color: #ffffff;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3), 0px 0px 0 1px rgba(8, 80, 172,1);
}
</style>