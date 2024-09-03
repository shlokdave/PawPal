import tensorflow as tf
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Input
from tensorflow.keras.applications import MobileNetV2

# Define input shape
input_shape = (224, 224, 3)  # Image input shape
batch_input_shape = (None, 224, 224, 3)  # Batch size dimension set to None for flexibility

# Reconstruct the model architecture with explicit batch_input_shape
inputs = Input(batch_shape=batch_input_shape)  # Use batch_shape to explicitly define the input shape with batch dimension
base_model = MobileNetV2(weights='imagenet', include_top=False, input_tensor=inputs)
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation='relu')(x)
predictions = Dense(120, activation='softmax')(x)  # Assuming 120 classes for dog breeds

model = tf.keras.models.Model(inputs=base_model.input, outputs = predictions)

# Print model summary to ensure it's correctly built
model.summary()

# Save the complete model in HDF5 format
model.save('model_full.h5')  # Save as HDF5 format
print("Model saved in HDF5 format as 'model_full.h5'.")

# Save the model in the native Keras format
model.save('model_full.keras')  # Save in the native Keras format
print("Model saved in Keras format as 'model_full.keras'.")