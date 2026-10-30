from PIL import Image
import numpy as np

# Load the raw cropped halves
left = Image.open('reference/logo-left-raw.png').convert('L')
right = Image.open('reference/logo-right-raw.png').convert('L')

# Left is black logo on white background.
# Threshold left: background is white (~255), logo is black (~0).
arr_left = np.array(left)
mask_left = arr_left < 128  # True where logo is black

# Right is white logo on black background.
# Threshold right: background is black (~0), logo is white (~255).
arr_right = np.array(right)
mask_right = arr_right > 128  # True where logo is white

# Find bounding box of logo in right image
y_indices, x_indices = np.where(mask_right)
min_x, max_x = np.min(x_indices), np.max(x_indices)
min_y, max_y = np.min(y_indices), np.max(y_indices)
print(f"Right logo bounding box: x=[{min_x}, {max_x}], y=[{min_y}, {max_y}] (width={max_x-min_x}, height={max_y-min_y})")

# Let's find the split between the mark (top icon) and the wordmark (bottom text)
# Look at horizontal projection (count of white pixels per row)
row_counts = np.sum(mask_right, axis=1)
# Find the gap (rows with 0 or very few white pixels between mark and text)
for y in range(min_y, max_y):
    if row_counts[y] == 0:
        print(f"Empty row at y={y}")

# Also find bounding box of mark and wordmark
mark_rows = np.where(row_counts[:260] > 0)[0]
text_rows = np.where(row_counts[260:] > 0)[0] + 260

print(f"Mark Y range: {mark_rows[0]} to {mark_rows[-1]}")
print(f"Text Y range: {text_rows[0]} to {text_rows[-1]}")

mark_mask = mask_right[mark_rows[0]:mark_rows[-1]+1, :]
mark_x = np.where(np.sum(mark_mask, axis=0) > 0)[0]
print(f"Mark X range: {mark_x[0]} to {mark_x[-1]} (width={mark_x[-1]-mark_x[0]+1}, height={mark_rows[-1]-mark_rows[0]+1})")

text_mask = mask_right[text_rows[0]:text_rows[-1]+1, :]
text_x = np.where(np.sum(text_mask, axis=0) > 0)[0]
print(f"Text X range: {text_x[0]} to {text_x[-1]} (width={text_x[-1]-text_x[0]+1}, height={text_rows[-1]-text_rows[0]+1})")
