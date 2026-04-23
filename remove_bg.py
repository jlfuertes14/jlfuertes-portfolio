"""Remove background from profile image using rembg (AI-based)."""
from rembg import remove
from PIL import Image
import io

input_path = "public/images/profile-black-suit.png"
output_path = "public/images/profile-transparent.png"

# Read the input image
with open(input_path, "rb") as f:
    input_data = f.read()

# Remove background using the u2net model (default, best quality)
output_data = remove(input_data)

# Save as PNG with transparency
img = Image.open(io.BytesIO(output_data))
img.save(output_path, "PNG")
print(f"✅ Background removed! Saved to: {output_path}")
print(f"   Output size: {img.size[0]}x{img.size[1]}")
