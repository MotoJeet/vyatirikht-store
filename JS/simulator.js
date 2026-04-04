document.addEventListener("DOMContentLoaded", () => {
    /* ==========================
    1. Exposure Lab
    ========================== */
    const iso = document.getElementById("iso")
    const aperture = document.getElementById("aperture")
    const shutter = document.getElementById("shutter")

    const isoValue = document.getElementById("isoValue")
    const apertureValue = document.getElementById("apertureValue")
    const shutterValue = document.getElementById("shutterValue")

    const preview = document.getElementById("previewImage")

    function updateExposure(){
        if(!iso || !preview || !isoValue || !apertureValue || !shutterValue) return;

        const isoVal = iso.value
        const apertureVal = aperture.value
        const shutterVal = shutter.value

        isoValue.innerText = isoVal
        apertureValue.innerText = "f/" + apertureVal
        shutterValue.innerText = "1/" + shutterVal

        const brightness = (isoVal / 100) * (2.8 / apertureVal) * (200 / shutterVal)
        const cappedBrightness = Math.min(Math.max(brightness, 0.1), 3.0)

        preview.style.filter = "brightness(" + cappedBrightness + ")"
    }

    if(iso) {
        iso.addEventListener("input", updateExposure)
        aperture.addEventListener("input", updateExposure)
        shutter.addEventListener("input", updateExposure)
        updateExposure()
    }


    /* ==========================
    2. Lens Perspective Lab
    ========================== */
    const lensBtns = document.querySelectorAll(".lens-btn")
    const lensPreview = document.getElementById("lensPreviewImage")
    const lensBadge = document.getElementById("lensBadge")

    if(lensBtns.length > 0 && lensPreview && lensBadge) {
        lensBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                lensBtns.forEach(b => b.classList.remove("active"))
                btn.classList.add("active")
                
                const focalLength = btn.getAttribute("data-focal")
                lensBadge.innerText = focalLength + "mm"
                
                let scaleValue = 1;
                if(focalLength === "16") scaleValue = 1;
                if(focalLength === "35") scaleValue = 1.4;
                if(focalLength === "50") scaleValue = 1.8;
                if(focalLength === "85") scaleValue = 2.5;

                lensPreview.style.transform = `scale(${scaleValue})`
            })
        })
    }


    /* ==========================
    3. Depth of Field (DOF) Explorer
    ========================== */
    const dofSlider = document.getElementById("dofApertureSlider")
    const dofBgPlane = document.querySelector(".dof-bg-plane")
    const dofFgPlane = document.querySelector(".dof-fg-plane")
    const dofText = document.getElementById("dofApertureText")

    function updateDOF() {
        if(!dofSlider || !dofBgPlane || !dofFgPlane || !dofText) return;

        const fStop = parseFloat(dofSlider.value)
        dofText.innerText = `f/${fStop.toFixed(1)}`

        let blurVal = Math.max(0, 16 - fStop);
        let fgBlur = blurVal * 0.8;
        let bgBlur = blurVal * 0.5;

        dofBgPlane.style.filter = `blur(${bgBlur}px)`
        dofFgPlane.style.filter = `blur(${fgBlur}px)`
    }

    if(dofSlider) {
        dofSlider.addEventListener("input", updateDOF)
        updateDOF()
    }
});