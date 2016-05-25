<?php

/* @Framework/Form/button_widget.html.php */
class __TwigTemplate_4d04c9df8ad093b461b3a6700c2f1dcdb6a6a81284e85aeb03968c40ee29a29f extends Twig_Template
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
        $__internal_a286d3c25a4e3e97ed9298b55709da7e00257d5c129b59b8f65b6478a65ef029 = $this->env->getExtension("native_profiler");
        $__internal_a286d3c25a4e3e97ed9298b55709da7e00257d5c129b59b8f65b6478a65ef029->enter($__internal_a286d3c25a4e3e97ed9298b55709da7e00257d5c129b59b8f65b6478a65ef029_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/button_widget.html.php"));

        // line 1
        echo "<?php if (!\$label) { \$label = isset(\$label_format)
    ? strtr(\$label_format, array('%name%' => \$name, '%id%' => \$id))
    : \$view['form']->humanize(\$name); } ?>
<button type=\"<?php echo isset(\$type) ? \$view->escape(\$type) : 'button' ?>\" <?php echo \$view['form']->block(\$form, 'button_attributes') ?>><?php echo \$view->escape(false !== \$translation_domain ? \$view['translator']->trans(\$label, array(), \$translation_domain) : \$label) ?></button>
";
        
        $__internal_a286d3c25a4e3e97ed9298b55709da7e00257d5c129b59b8f65b6478a65ef029->leave($__internal_a286d3c25a4e3e97ed9298b55709da7e00257d5c129b59b8f65b6478a65ef029_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/button_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php if (!$label) { $label = isset($label_format)*/
/*     ? strtr($label_format, array('%name%' => $name, '%id%' => $id))*/
/*     : $view['form']->humanize($name); } ?>*/
/* <button type="<?php echo isset($type) ? $view->escape($type) : 'button' ?>" <?php echo $view['form']->block($form, 'button_attributes') ?>><?php echo $view->escape(false !== $translation_domain ? $view['translator']->trans($label, array(), $translation_domain) : $label) ?></button>*/
/* */
