function range(id, min, max) {
    const dRange = document.getElementById(id)
    dRange.className = "range"
    const dPosition = document.createElement("div")
    dPosition.className = "range-position"
    const pValue = document.createElement("p")
    dPosition.append(pValue)
    const dProgress = document.createElement("div")
    dProgress.className = "range-progress"
    const dBackground = document.createElement("div")
    dBackground.className = "range-background"
    dRange.append(dBackground)
    dRange.append(dProgress)
    dRange.append(dPosition)

    const dragEnded = function () {
        drag = false
    }
    const moveTo = function (xPosition) {
        position = xPosition - offset
        if (position < pMin) {
            position = pMin
        } else if (position > pMax) {
            position = pMax
        }
        dPosition.style.left = (position - offset) + "px"
        dProgress.style.width = (position - offset) + "px"
        const valueInner = (position - pMin) / width
        const value = (max - min) * valueInner + min
        pValue.innerText = value.toPrecision(3)
    }

    let drag = false
    let initX = 0
    const dSliderWidth = parseInt(getComputedStyle(dRange).getPropertyValue("width"))
    const dPositionWidth = parseInt(getComputedStyle(dPosition).getPropertyValue("width"))
    const offset = dPositionWidth / 2
    let position = parseInt(getComputedStyle(dPosition).left) + offset
    dProgress.style.left = offset + "px"
    dBackground.style.left = offset + "px"
    const width = dSliderWidth - 2 * offset
    dProgress.style.width = (position - offset) + "px"
    dBackground.style.width = width + "px"
    const pMin = offset
    const pMax = pMin + width
    moveTo(0)

    dPosition.addEventListener("mousedown", (e) => {
        initX = e.clientX - position - offset
        drag = true
    })
    dPosition.addEventListener("mouseup", dragEnded)
    dRange.addEventListener("mousemove", (e) => {
        if (drag) {
            e.preventDefault()
            moveTo(e.clientX - initX)
        }
    })
    dRange.addEventListener("mouseup", dragEnded)
    dRange.addEventListener("mousedown", (e) => moveTo(e.clientX))
    dRange.addEventListener("mouseleave", dragEnded)
}

range("range", 0, 100)