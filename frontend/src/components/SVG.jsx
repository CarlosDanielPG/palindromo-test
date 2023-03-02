/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

const SVG = ({ url }) => {
    const [image, setImage] = useState('')

    useEffect(() => {
        fetch(url)
        .then(res => res.text())
        .then(text => setImage(text))
    }, [])

    return <div style={{ width: '60px', height: 'auto' }} dangerouslySetInnerHTML={{ __html: image }}/>;
}

export default SVG