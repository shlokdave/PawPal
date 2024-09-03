import tensorflow as tf
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Input
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Model
import os

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

model = tf.keras.models.Model(inputs=base_model.input, outputs=predictions)

# Freeze the base model layers
for layer in base_model.layers:
    layer.trainable = False

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Data generators
train_datagen = ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    validation_split = 0.2
)

# Define dataset path
dataset_path = '/Users/shlokdave/Desktop/images'

# Load training data
train_generator = train_datagen.flow_from_directory(
    dataset_path, 
    target_size=(224, 224), 
    batch_size=32, 
    class_mode='categorical',
    subset='training'
)

# Load validation data
validation_generator = train_datagen.flow_from_directory(
    dataset_path, 
    target_size=(224, 224), 
    batch_size=32, 
    class_mode='categorical',
    subset='validation'
)

# Train the model
model.fit(
    train_generator, 
    validation_data=validation_generator, 
    epochs=10
)

# Save the complete model in TensorFlow SavedModel format
saved_model_path = os.path.join(os.getcwd(), 'saved_model')
model.save(saved_model_path, save_format='tf')
print(f"Model has been successfully saved in TensorFlow SavedModel format at '{saved_model_path}'")

