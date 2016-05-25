<?php

/* @Framework/Form/form_row.html.php */
class __TwigTemplate_d7ca57502ba74ca041370cf7e863867949bfb446ff509387f99efd37c19bc5b5 extends Twig_Template
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
        $__internal_9df48babe041cc6170dc28d0ee041a05b5be16f4a0064dbcaa22500b593d4d95 = $this->env->getExtension("native_profiler");
        $__internal_9df48babe041cc6170dc28d0ee041a05b5be16f4a0064dbcaa22500b593d4d95->enter($__internal_9df48babe041cc6170dc28d0ee041a05b5be16f4a0064dbcaa22500b593d4d95_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_row.html.php"));

        // line 1
        echo "<div>
    <?php echo \$view['form']->label(\$form) ?>
    <?php echo \$view['form']->errors(\$form) ?>
    <?php echo \$view['form']->widget(\$form) ?>
</div>
";
        
        $__internal_9df48babe041cc6170dc28d0ee041a05b5be16f4a0064dbcaa22500b593d4d95->leave($__internal_9df48babe041cc6170dc28d0ee041a05b5be16f4a0064dbcaa22500b593d4d95_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_row.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <div>*/
/*     <?php echo $view['form']->label($form) ?>*/
/*     <?php echo $view['form']->errors($form) ?>*/
/*     <?php echo $view['form']->widget($form) ?>*/
/* </div>*/
/* */
