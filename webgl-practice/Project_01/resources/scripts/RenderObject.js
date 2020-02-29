class RenderObject
{
    constructor (texture)
    {
        this.vertexNum = 0;
        this.faceNum = 0;
        this.positions = [];
        this.texcoord = [];
        this.indices = [];
        this.texture = texture;
    }

    addVertex (vPos, tCoord)
    {
        if (vPos.length != tCoord.length)
        {
            console.log("Error : position mismatch");
            return -1;
        }
        if (vPos.length % 2 != 0)
        {
            console.log("Error : dimension mismatch");
            return -2;
        }

        let i = 0;
        for (; i < vPos.length; i++)
        {
            this.positions.push(vPos[i]);
            this.texcoord.push(tCoord[i]);
        }

        this.vertexNum += vPos.length / 2;

        return this.vertexnum;
    }

    static loadTexture (gl, url)
    {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        const image = new Image();
        image.onload = function() {
            function isPowerOf2(value) {
                return (value & (value - 1)) == 0;
            }
            
            gl.bindTexture(gl.TEXTURE_2D, texture);

            const level = 0;
            const internalFormat = gl.RGBA;
            const srcFormat = gl.RGBA;
            const srcType = gl.UNSIGNED_BYTE;

            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                        srcFormat, srcType, image);

            // WebGL1 has different requirements for power of 2 images
            // vs non power of 2 images so check if the image is a
            // power of 2 in both dimensions.
            if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                // Yes, it's a power of 2. Generate mips.
                gl.generateMipmap(gl.TEXTURE_2D);
            }
            else {
                // No, it's not a power of 2. Turn off mips and set
                // wrapping to clamp to edge
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        image.src = url;

        return texture;
    }
}