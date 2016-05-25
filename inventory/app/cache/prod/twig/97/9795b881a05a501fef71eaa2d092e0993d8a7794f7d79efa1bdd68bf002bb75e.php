<?php

/* @Framework/Form/form_widget_compound.html.php */
class __TwigTemplate_8ae8600776ede24e65ba9324e0472af4a379f76308646ea3ddca0ed98ebac478 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_4e7036ec5be17138ddd39fb007e3f8205e44fa1ee1722bb1428e2c6b1fb6fae4 = $this->env->getExtension("native_profiler");
        $__internal_4e7036ec5be17138ddd39fb007e3f8205e44fa1ee1722bb1428e2c6b1fb6fae4->enter($__internal_4e7036ec5be17138ddd39fb007e3f8205e44fa1ee1722bb1428e2c6b1fb6fae4_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_widget_compound.html.php"));

        // line 1
        echo "<div <?php echo \$view['form']->block(\$form, 'widget_container_attributes') ?>>
    <?php if (!\$form->parent && \$errors): ?>
    <?php echo \$view['form']->errors(\$form) ?>
    <?php endif ?>
    <?php echo \$view['form']->block(\$form, 'form_rows') ?>
    <?php echo \$view['form']->rest(\$form) ?>
</div>
";
        
        $__internal_4e7036ec5be17138ddd39fb007e3f8205e44fa1ee1722bb1428e2c6b1fb6fae4->leave($__internal_4e7036ec5be17138ddd39fb007e3f8205e44fa1ee1722bb1428e2c6b1fb6fae4_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_widget_compound.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <div <?php echo $view['form']->block($form, 'widget_container_attributes') ?>>*/
/*     <?php if (!$form->parent && $errors): ?>*/
/*     <?php echo $view['form']->errors($form) ?>*/
/*     <?php endif ?>*/
/*     <?php echo $view['form']->block($form, 'form_rows') ?>*/
/*     <?php echo $view['form']->rest($form) ?>*/
/* </div>*/
/* */
