import os
from PIL import Image
import io

# Define the maximum allowed file size in bytes (1MB)
MAX_FILE_SIZE = 1 * 1024 * 1024

# Supported image formats
SUPPORTED_EXTENSIONS = ('.jpg', '.jpeg', '.bmp', '.gif', '.tiff', '.webp', '.png')

def convert_and_resize_image(image_path, output_path):
    try:
        with Image.open(image_path) as img:
            img = img.convert("RGBA")  # Convert to RGBA for PNG format

            # First try saving directly as PNG
            buffer = io.BytesIO()
            img.save(buffer, format='PNG')
            size = buffer.tell()

            # If size > 1MB, start resizing
            if size > MAX_FILE_SIZE:
                print(f"Resizing {image_path} (original: {size / 1024:.2f} KB)")
                scale = 0.9  # Initial scale factor
                while size > MAX_FILE_SIZE and scale > 0.1:
                    # Resize the image
                    new_size = (int(img.width * scale), int(img.height * scale))
                    resized_img = img.resize(new_size, Image.LANCZOS)
                    buffer = io.BytesIO()
                    resized_img.save(buffer, format='PNG')
                    size = buffer.tell()
                    scale -= 0.05  # Reduce scale gradually

                resized_img.save(output_path, format='PNG')
                print(f"Saved resized: {output_path} ({size / 1024:.2f} KB)")
            else:
                with open(output_path, 'wb') as f:
                    f.write(buffer.getvalue())
                print(f"Saved: {output_path} ({size / 1024:.2f} KB)")

    except Exception as e:
        print(f"Error processing {image_path}: {e}")

def process_folder(root_folder):
    for root, _, files in os.walk(root_folder):
        for file in files:
            if file.lower().endswith(SUPPORTED_EXTENSIONS):
                input_path = os.path.join(root, file)
                filename_wo_ext = os.path.splitext(file)[0]
                output_path = os.path.join(root, f"{filename_wo_ext}.png")
                
                # Skip if already processed
                if os.path.exists(output_path):
                    continue

                convert_and_resize_image(input_path, output_path)

if __name__ == "__main__":
    folder_path = input("Enter the path to the folder: ").strip()
    if os.path.isdir(folder_path):
        process_folder(folder_path)
        print("Processing complete.")
    else:
        print("Invalid folder path.")
